/*
 * 类目模型：用于分类 Tab 与子类导航
 * 中文注释，ArkTS 代码规范
 */

export interface Subcategory {
  id: string; // 子类 ID
  name: string; // 子类名称
}

export interface Category {
  id: string; // 一级类目 ID
  name: string; // 一级类目名称
  children?: Subcategory[]; // 子类列表
}
