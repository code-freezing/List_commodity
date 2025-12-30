/*
 * 搜索与筛选栏组件：
 * - 支持关键词搜索、价格区间、排序等多重过滤
 * - 绑定 homeDS 数据源，所有筛选操作均驱动数据源刷新
 * - 结构清晰，便于扩展更多筛选项
 */

import AdvancedListDataSource from '../viewmodel/AdvancedListDataSource';
import { SortBy } from '../models/Goods';
import * as commonConst from '../common/CommonConstants';

@Component
export default struct SearchAndFilterBar {
  // 精选页的独立数据源，避免影响其它分类页
  @Consume homeDS: AdvancedListDataSource;

  // 本地输入状态（关键词、价格区间）
  @State keyword: string = '';
  @State minPrice: number | undefined = undefined;
  @State maxPrice: number | undefined = undefined;

  // 移除标签过滤，仅保留关键词与价格相关筛选

  // 应用所有筛选条件，驱动数据源刷新
  private applyAll() {
    this.homeDS.setKeyword(this.keyword);
    this.homeDS.setPriceRange(this.minPrice, this.maxPrice);
  }

  build() {
    Column() {
      // 搜索框区域：输入关键词，点击搜索按钮触发过滤
      Row() {
        TextInput({ text: this.keyword })
          .width('75%')
          .height(40)
          .onChange((value: string) => { this.keyword = value; })
        Button('搜索')
          .type(ButtonType.Normal)
          .width('22%')
          .height(40)
          .onClick(() => this.homeDS.setKeyword(this.keyword))
      }
      .width(commonConst.GOODS_LIST_WIDTH)
      .margin({ bottom: 8 })

      // 排序按钮区域
      Row() {
        Button('价格↑').onClick(() => this.homeDS.setSort(SortBy.PriceAsc))
        Button('价格↓').onClick(() => this.homeDS.setSort(SortBy.PriceDesc)).margin({ left: 8 })
      }
      .width(commonConst.GOODS_LIST_WIDTH)
      .margin({ bottom: 8 })

      // 价格区间输入与应用/重置按钮区域
      Row() {
        Text('价格区间:').fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
        TextInput({ text: this.minPrice === undefined ? '' : String(this.minPrice) })
          .width(80)
          .onChange((v: string) => {
            const n: number = Number(v);
            this.minPrice = isNaN(n) ? undefined : n;
          })
          .margin({ left: 8 })
        TextInput({ text: this.maxPrice === undefined ? '' : String(this.maxPrice) })
          .width(80)
          .onChange((v: string) => {
            const n: number = Number(v);
            this.maxPrice = isNaN(n) ? undefined : n;
          })
          .margin({ left: 8 })
        Button('应用').onClick(() => this.applyAll()).margin({ left: 12 })
        Button('重置').onClick(() => {
          this.keyword = '';
          this.minPrice = undefined;
          this.maxPrice = undefined;
          this.homeDS.reset();
        }).margin({ left: 8 })
      }
      .width(commonConst.GOODS_LIST_WIDTH)
      .margin({ bottom: 8 })

      // 标签过滤已移除
      .width(commonConst.GOODS_LIST_WIDTH)
    }
    .width('100%')
    .padding({ top: 8, bottom: 8 })
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}
