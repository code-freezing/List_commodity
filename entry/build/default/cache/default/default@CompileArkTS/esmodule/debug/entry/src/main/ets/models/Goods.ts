/*
 * 商品领域模型，供搜索、筛选、排序与展示使用
 * 代码遵循 HarmonyOS ArkTS 语言规范，并包含中文注释
 */
// 商品排序方式枚举
export enum SortBy {
    // 按价格从低到高
    PriceAsc = 0,
    // 按价格从高到低
    PriceDesc = 1
}
// 商品分类与子类标识
export interface CategoryRef {
    categoryId: string; // 一级类目 ID
    subcategoryId?: string; // 二级类目 ID
}
// 商品模型（包含展示与可筛选的元数据）
export interface Goods {
    id: number; // 商品唯一标识
    name: string; // 商品名称（用于搜索/展示）
    keywords: string[]; // 关键词，用于搜索匹配
    price: number; // 价格（用于排序/筛选）
    ratingCount: number; // 评价数（用于热度排序）
    image: Resource; // 缩略图资源
    imageHeight: number; // 图片高度（模拟高矮图瀑布流）
    advertisingText?: string; // 广告文案（展示）
    category: CategoryRef; // 分类映射
    tags?: string[]; // 其它标签（可用于叠加过滤）
    createdSeq?: number; // 上新序列（越大越新）
}
// 筛选条件
export interface FilterOptions {
    keyword?: string; // 搜索关键词
    categoryId?: string; // 一级类目
    subcategoryId?: string; // 二级类目
    minPrice?: number; // 最低价格
    maxPrice?: number; // 最高价格
    sortBy?: SortBy; // 排序方式（仅价格升降序）
}
