import { SortBy } from "@bundle:com.example.list_harmony/entry/ets/models/Goods";
import type { Goods, FilterOptions } from "@bundle:com.example.list_harmony/entry/ets/models/Goods";
import { getAllGoods } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/GoodsRepository";
import { MAX_DATA_LENGTH } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
// 使用可观察类，在 UI 中以 @ObjectLink 传递以触发刷新
@Observed
export default class AdvancedListDataSource {
    // 全量商品数据（只读）
    allGoods: Goods[] = getAllGoods();
    // 当前筛选条件
    // 默认按价格升序排序
    filter: FilterOptions = { sortBy: SortBy.PriceAsc };
    // 筛选后的商品结果（被观察，修改会触发 UI 更新）
    filteredGoods: Goods[] = this.allGoods;
    // 对外访问
    getGoods(): Goods[] {
        return this.filteredGoods;
    }
    // 设置搜索关键词
    setKeyword(keyword?: string) {
        this.filter.keyword = keyword?.trim();
        this.applyFilters();
    }
    // 设置分类与子类
    setCategory(categoryId?: string, subcategoryId?: string) {
        this.filter.categoryId = categoryId;
        this.filter.subcategoryId = subcategoryId;
        this.applyFilters();
    }
    // 设置价格区间
    setPriceRange(minPrice?: number, maxPrice?: number) {
        this.filter.minPrice = minPrice;
        this.filter.maxPrice = maxPrice;
        this.applyFilters();
    }
    // 不再支持标签过滤，方法移除
    // 设置排序
    setSort(sortBy: SortBy) {
        this.filter.sortBy = sortBy;
        this.applyFilters();
    }
    // 清空所有条件
    reset() {
        this.filter = { sortBy: SortBy.PriceAsc };
        this.filteredGoods = this.allGoods;
    }
    // 上拉加载更多（示例：追加一页当前结果，直到达到最大长度）
    loadMore() {
        const currentLength: number = this.filteredGoods.length;
        if (currentLength >= MAX_DATA_LENGTH) {
            return;
        }
        const base: Goods[] = currentLength > 0 ? this.filteredGoods : this.allGoods;
        const remain: number = MAX_DATA_LENGTH - currentLength;
        // 取一段追加
        const append: Goods[] = [];
        const limit: number = (base.length < remain) ? base.length : remain;
        for (let i: number = 0; i < limit; i++) {
            append.push(base[i]);
        }
        this.filteredGoods = this.filteredGoods.concat(append);
    }
    // 应用筛选与排序
    private applyFilters() {
        const f = this.filter;
        let result = this.allGoods.slice();
        // 关键词匹配（名称或关键词包含）
        if (f.keyword && f.keyword.length > 0) {
            const kw = f.keyword.toLowerCase();
            result = result.filter(g => g.name.toLowerCase().includes(kw) ||
                (g.keywords?.some(k => k.toLowerCase().includes(kw)) ?? false));
        }
        // 类目过滤
        if (f.categoryId) {
            result = result.filter(g => g.category.categoryId === f.categoryId);
        }
        if (f.subcategoryId) {
            result = result.filter(g => g.category.subcategoryId === f.subcategoryId);
        }
        // 价格区间
        if (typeof f.minPrice === 'number') {
            result = result.filter(g => g.price >= (f.minPrice as number));
        }
        if (typeof f.maxPrice === 'number') {
            result = result.filter(g => g.price <= (f.maxPrice as number));
        }
        // 标签过滤已移除
        // 排序
        switch (f.sortBy) {
            case SortBy.PriceAsc:
                result.sort((a, b) => a.price - b.price);
                break;
            case SortBy.PriceDesc:
                result.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        this.filteredGoods = result;
    }
}
