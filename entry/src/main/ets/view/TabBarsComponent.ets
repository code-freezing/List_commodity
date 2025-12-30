/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { initTabBarData } from '../viewmodel/InitialData';
import {
  LAYOUT_WIDTH_OR_HEIGHT,
  NORMAL_FONT_SIZE,
  BIGGER_FONT_SIZE,
  MAX_FONT_SIZE,
  MAX_OFFSET_Y,
  REFRESH_TIME,
  GOODS_EVALUATE_FONT_SIZE,
  MAX_LINES_TEXT
} from '../common/CommonConstants';
import SearchAndFilterBar from './SearchAndFilterBar';
import AdvancedListDataSource from '../viewmodel/AdvancedListDataSource';
import { categories } from '../viewmodel/GoodsRepository';
import { Subcategory } from '../models/Category';
import WaterfallList from './WaterfallList';
import RefreshLayout, { RefreshHandler } from './RefreshLayout';

// TabBarsComponent 负责页面顶部 Tab 导航、子类筛选、商品列表渲染、下拉刷新等核心交互逻辑
@Component
export default struct TabBar {
  // Tab 当前索引
  @State tabsIndex: number = 0;
  // 刷新状态与提示文案
  @State refreshStatus: boolean = false;
  @State refreshText: Resource = $r('app.string.refresh_text');
  // 滚动 key 用于强制刷新 Scroll 组件
  @State homeScrollKey: number = 0;
  @State categoryScrollKey: number = 0;
  // Scroller 控制精选/分类列表的滚动
  private homeScroller: Scroller = new Scroller();
  private categoryScroller: Scroller = new Scroller();
  // 高级数据源通过 @Provide 共享给子组件（@Consume 接收）
  // homeDS：精选商品数据源，categoryDS：分类商品数据源，互不影响
  @Provide homeDS: AdvancedListDataSource = new AdvancedListDataSource();
  @Provide categoryDS: AdvancedListDataSource = new AdvancedListDataSource();
  // 当前选中的子类（每个类目对应一组子类）
  @State selectedSubcategoryId: string = 'all';
  // 触摸位移（用于上拉加载更多）
  private startTouchOffsetY: number = 0;
  private endTouchOffsetY: number = 0;

  // 下拉刷新回调（精选）
  // 模拟异步刷新，实际可接入接口
  private async onHomeRefresh(): Promise<void> {
    this.refreshStatus = true;
    await new Promise<void>((resolve) => setTimeout(resolve, REFRESH_TIME));
    this.refreshStatus = false;
  }

  // 下拉刷新回调（分类）
  // 模拟异步刷新，实际可接入接口
  private async onCategoryRefresh(): Promise<void> {
    this.refreshStatus = true;
    await new Promise<void>((resolve) => setTimeout(resolve, REFRESH_TIME));
    this.refreshStatus = false;
  }

  // 精选 Tab 上拉触发懒加载
  private handleHomeTouch(event?: TouchEvent): void {
    if (event === undefined) { return; }
    switch (event.type) {
      case TouchType.Down:
        this.startTouchOffsetY = event.touches[0].y;
        break;
      case TouchType.Move:
        this.endTouchOffsetY = event.touches[0].y;
        if (this.startTouchOffsetY - this.endTouchOffsetY > 0) {
          this.homeDS.loadMore();
        }
        break;
      default:
        break;
    }
  }

  // 分类 Tab 上拉触发懒加载
  private handleCategoryTouch(event?: TouchEvent): void {
    if (event === undefined) { return; }
    switch (event.type) {
      case TouchType.Down:
        this.startTouchOffsetY = event.touches[0].y;
        break;
      case TouchType.Move:
        this.endTouchOffsetY = event.touches[0].y;
        if (this.startTouchOffsetY - this.endTouchOffsetY > 0) {
          this.categoryDS.loadMore();
        }
        break;
      default:
        break;
    }
  }

  // 精选 Tab 内容区域，含搜索栏、商品瀑布流、到底提示
  @Builder
  homeContent() {
    Scroll(this.homeScroller) {
      Column() {
        SearchAndFilterBar()
        WaterfallList({ mode: 'home' })
        Text($r('app.string.to_bottom'))
          .fontSize(NORMAL_FONT_SIZE)
          .fontColor($r('app.color.gray'))
          .width('100%')
          .textAlign(TextAlign.Center)
      }
      .width(LAYOUT_WIDTH_OR_HEIGHT)
      .padding({ top: 0 })
      .constraintSize({ minHeight: LAYOUT_WIDTH_OR_HEIGHT })
      .justifyContent(FlexAlign.Start)
      .alignItems(HorizontalAlign.Start)
    }
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .height(LAYOUT_WIDTH_OR_HEIGHT)
    .layoutWeight(1)
    .id(`home-${this.homeScrollKey}`)
    .onTouch((event?: TouchEvent) => this.handleHomeTouch(event))
  }

  // 分类 Tab 内容区域，含子类按钮、商品瀑布流、到底提示
  @Builder
  categoryContent(index: number) {
    Scroll(this.categoryScroller) {
      Column() {
        Row() {
          Button((this.selectedSubcategoryId === 'all') ? '✓ 全部' : '全部')
            .type((this.selectedSubcategoryId === 'all') ? ButtonType.Capsule : ButtonType.Normal)
            .onClick(() => {
              this.selectedSubcategoryId = 'all';
              const catId: string = (categories[index] !== undefined) ? (categories[index].id) : '';
              this.categoryDS.setCategory(catId, undefined);
            })
            .margin({ right: 8, bottom: 8 })

          ForEach((categories[index] !== undefined) ? (categories[index].children ?? []) : [], (sub: Subcategory) => {
            Button((this.selectedSubcategoryId === sub.id) ? `✓ ${sub.name}` : sub.name)
              .type((this.selectedSubcategoryId === sub.id) ? ButtonType.Capsule : ButtonType.Normal)
              .onClick(() => {
                this.selectedSubcategoryId = sub.id;
                const catId: string = (categories[index] !== undefined) ? (categories[index].id) : '';
                this.categoryDS.setCategory(catId, sub.id);
              })
              .margin({ right: 8, bottom: 8 })
          })
        }
        .width(LAYOUT_WIDTH_OR_HEIGHT)
        .padding({ left: 12, right: 12, top: 0 })

        WaterfallList({ mode: 'category' })
        Text($r('app.string.to_bottom'))
          .fontSize(NORMAL_FONT_SIZE)
          .fontColor($r('app.color.gray'))
          .width('100%')
          .textAlign(TextAlign.Center)
      }
      .width(LAYOUT_WIDTH_OR_HEIGHT)
      .padding({ top: 0 })
      .constraintSize({ minHeight: LAYOUT_WIDTH_OR_HEIGHT })
      .justifyContent(FlexAlign.Start)
      .alignItems(HorizontalAlign.Start)
    }
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .height(LAYOUT_WIDTH_OR_HEIGHT)
    .layoutWeight(1)
    .id(`category-${this.categoryScrollKey}`)
    .onTouch((event?: TouchEvent) => this.handleCategoryTouch(event))
  }

  // 精选 Tab 的 TabBar 样式
  @Builder
  firstTabBar() {
    Column() {
      Text($r('app.string.selected'))
        .fontSize(this.tabsIndex === 0 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE)
        .fontColor(this.tabsIndex === 0 ? Color.Black : $r('app.color.gray'))
        .maxLines(MAX_LINES_TEXT)
        .minFontSize(this.tabsIndex === 0 ? NORMAL_FONT_SIZE : GOODS_EVALUATE_FONT_SIZE)
        .maxFontSize(this.tabsIndex === 0 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE)
    }
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .height(LAYOUT_WIDTH_OR_HEIGHT)
    .justifyContent(FlexAlign.Center)
  }

  // 精选 Tab 外层刷新容器
  @Builder
  private homeTab(): void {
    RefreshLayout({
      triggerOffset: MAX_OFFSET_Y,
      onRefresh: this.homeRefreshHandler(),
      content: (): void => this.homeContent()
    })
  }

  // 分类 Tab 外层刷新容器
  @Builder
  private categoryTab(index: number): void {
    RefreshLayout({
      triggerOffset: MAX_OFFSET_Y,
      onRefresh: this.categoryRefreshHandler(),
      content: (): void => this.categoryContent(index)
    })
  }

  // 精选 Tab 刷新回调适配器
  private homeRefreshHandler(): RefreshHandler {
    return { run: (): Promise<void> | void => this.onHomeRefresh() };
  }

  // 分类 Tab 刷新回调适配器
  private categoryRefreshHandler(): RefreshHandler {
    return { run: (): Promise<void> | void => this.onCategoryRefresh() };
  }

  // 分类 Tab 的 TabBar 样式
  @Builder
  otherTabBar(content: Resource, index: number) {
    Column() {
      Text(content)
        .fontSize(this.tabsIndex === index + 1 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE)
        .fontColor(this.tabsIndex === index + 1 ? Color.Black : $r('app.color.gray'))
        .maxLines(MAX_LINES_TEXT)
        .minFontSize(this.tabsIndex === index + 1 ? NORMAL_FONT_SIZE : GOODS_EVALUATE_FONT_SIZE)
        .maxFontSize(this.tabsIndex === index + 1 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE)
    }
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .height(LAYOUT_WIDTH_OR_HEIGHT)
    .justifyContent(FlexAlign.Center)
  }

  // 构建页面主结构：顶部 Tabs，TabContent 区分精选与各分类，切换时重置筛选与滚动
  build() {
    Tabs() {
      // 精选 Tab
      TabContent() {
        this.homeTab();
      }
      .tabBar(this.firstTabBar)

      // 其它分类 Tab：三步内找到目标品类（点 Tab → 看子类 → 浏览商品）
      ForEach(initTabBarData, (item: Resource, index?: number) => {
        TabContent() {
          this.categoryTab(index !== undefined ? index : 0);
        }
        .tabBar(this.otherTabBar(item, index !== undefined ? index : 0))
      })
    }
    .onChange((index: number) => {
      // 记录当前 Tab 索引
      this.tabsIndex = index;
      // 切换 Tab 时重置筛选与滚动，首个 Tab 恢复全部，分类 Tab 按类目过滤
      if (index === 0) {
        this.selectedSubcategoryId = 'all';
        this.homeDS.reset();
        this.homeScrollKey++;
        this.homeScroller.scrollTo({ xOffset: 0, yOffset: 0 });
      } else {
        const catIdx: number = index - 1; // categories 与 initTabBarData 顺序一致
        if (catIdx >= 0 && catIdx < categories.length) {
          this.selectedSubcategoryId = 'all';
          this.categoryDS.setCategory(categories[catIdx].id, undefined);
          this.categoryScrollKey++;
          this.categoryScroller.scrollTo({ xOffset: 0, yOffset: 0 });
        }
      }
    })
    .vertical(false)
    // Tabs 拉满可视区域，避免内容不足时的默认居中
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .height(LAYOUT_WIDTH_OR_HEIGHT)
  }
}