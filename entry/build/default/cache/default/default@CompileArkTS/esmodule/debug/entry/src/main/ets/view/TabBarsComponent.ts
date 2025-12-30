if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TabBar_Params {
    tabsIndex?: number;
    refreshStatus?: boolean;
    refreshText?: Resource;
    homeScrollKey?: number;
    categoryScrollKey?: number;
    homeScroller?: Scroller;
    categoryScroller?: Scroller;
    homeDS?: AdvancedListDataSource;
    categoryDS?: AdvancedListDataSource;
    selectedSubcategoryId?: string;
    startTouchOffsetY?: number;
    endTouchOffsetY?: number;
}
import { initTabBarData } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import { LAYOUT_WIDTH_OR_HEIGHT, NORMAL_FONT_SIZE, BIGGER_FONT_SIZE, MAX_OFFSET_Y, REFRESH_TIME, GOODS_EVALUATE_FONT_SIZE, MAX_LINES_TEXT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import SearchAndFilterBar from "@bundle:com.example.list_harmony/entry/ets/view/SearchAndFilterBar";
import AdvancedListDataSource from "@bundle:com.example.list_harmony/entry/ets/viewmodel/AdvancedListDataSource";
import { categories } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/GoodsRepository";
import type { Subcategory } from '../models/Category';
import WaterfallList from "@bundle:com.example.list_harmony/entry/ets/view/WaterfallList";
import RefreshLayout from "@bundle:com.example.list_harmony/entry/ets/view/RefreshLayout";
import type { RefreshHandler } from "@bundle:com.example.list_harmony/entry/ets/view/RefreshLayout";
export default class TabBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tabsIndex = new ObservedPropertySimplePU(0, this, "tabsIndex");
        this.__refreshStatus = new ObservedPropertySimplePU(false, this, "refreshStatus");
        this.__refreshText = new ObservedPropertyObjectPU({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, this, "refreshText");
        this.__homeScrollKey = new ObservedPropertySimplePU(0, this, "homeScrollKey");
        this.__categoryScrollKey = new ObservedPropertySimplePU(0, this, "categoryScrollKey");
        this.homeScroller = new Scroller();
        this.categoryScroller = new Scroller();
        this.__homeDS = new ObservedPropertyObjectPU(new AdvancedListDataSource(), this, "homeDS");
        this.addProvidedVar("homeDS", this.__homeDS, false);
        this.__categoryDS = new ObservedPropertyObjectPU(new AdvancedListDataSource(), this, "categoryDS");
        this.addProvidedVar("categoryDS", this.__categoryDS, false);
        this.__selectedSubcategoryId = new ObservedPropertySimplePU('all', this, "selectedSubcategoryId");
        this.startTouchOffsetY = 0;
        this.endTouchOffsetY = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabBar_Params) {
        if (params.tabsIndex !== undefined) {
            this.tabsIndex = params.tabsIndex;
        }
        if (params.refreshStatus !== undefined) {
            this.refreshStatus = params.refreshStatus;
        }
        if (params.refreshText !== undefined) {
            this.refreshText = params.refreshText;
        }
        if (params.homeScrollKey !== undefined) {
            this.homeScrollKey = params.homeScrollKey;
        }
        if (params.categoryScrollKey !== undefined) {
            this.categoryScrollKey = params.categoryScrollKey;
        }
        if (params.homeScroller !== undefined) {
            this.homeScroller = params.homeScroller;
        }
        if (params.categoryScroller !== undefined) {
            this.categoryScroller = params.categoryScroller;
        }
        if (params.homeDS !== undefined) {
            this.homeDS = params.homeDS;
        }
        if (params.categoryDS !== undefined) {
            this.categoryDS = params.categoryDS;
        }
        if (params.selectedSubcategoryId !== undefined) {
            this.selectedSubcategoryId = params.selectedSubcategoryId;
        }
        if (params.startTouchOffsetY !== undefined) {
            this.startTouchOffsetY = params.startTouchOffsetY;
        }
        if (params.endTouchOffsetY !== undefined) {
            this.endTouchOffsetY = params.endTouchOffsetY;
        }
    }
    updateStateVars(params: TabBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabsIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshText.purgeDependencyOnElmtId(rmElmtId);
        this.__homeScrollKey.purgeDependencyOnElmtId(rmElmtId);
        this.__categoryScrollKey.purgeDependencyOnElmtId(rmElmtId);
        this.__homeDS.purgeDependencyOnElmtId(rmElmtId);
        this.__categoryDS.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedSubcategoryId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabsIndex.aboutToBeDeleted();
        this.__refreshStatus.aboutToBeDeleted();
        this.__refreshText.aboutToBeDeleted();
        this.__homeScrollKey.aboutToBeDeleted();
        this.__categoryScrollKey.aboutToBeDeleted();
        this.__homeDS.aboutToBeDeleted();
        this.__categoryDS.aboutToBeDeleted();
        this.__selectedSubcategoryId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __tabsIndex: ObservedPropertySimplePU<number>;
    get tabsIndex() {
        return this.__tabsIndex.get();
    }
    set tabsIndex(newValue: number) {
        this.__tabsIndex.set(newValue);
    }
    private __refreshStatus: ObservedPropertySimplePU<boolean>;
    get refreshStatus() {
        return this.__refreshStatus.get();
    }
    set refreshStatus(newValue: boolean) {
        this.__refreshStatus.set(newValue);
    }
    private __refreshText: ObservedPropertyObjectPU<Resource>;
    get refreshText() {
        return this.__refreshText.get();
    }
    set refreshText(newValue: Resource) {
        this.__refreshText.set(newValue);
    }
    private __homeScrollKey: ObservedPropertySimplePU<number>;
    get homeScrollKey() {
        return this.__homeScrollKey.get();
    }
    set homeScrollKey(newValue: number) {
        this.__homeScrollKey.set(newValue);
    }
    private __categoryScrollKey: ObservedPropertySimplePU<number>;
    get categoryScrollKey() {
        return this.__categoryScrollKey.get();
    }
    set categoryScrollKey(newValue: number) {
        this.__categoryScrollKey.set(newValue);
    }
    private homeScroller: Scroller;
    private categoryScroller: Scroller;
    // 高级数据源通过 @Provide 共享给子组件（@Consume 接收）
    // 独立的精选数据源与分类数据源，互不影响
    private __homeDS: ObservedPropertyObjectPU<AdvancedListDataSource>;
    get homeDS() {
        return this.__homeDS.get();
    }
    set homeDS(newValue: AdvancedListDataSource) {
        this.__homeDS.set(newValue);
    }
    private __categoryDS: ObservedPropertyObjectPU<AdvancedListDataSource>;
    get categoryDS() {
        return this.__categoryDS.get();
    }
    set categoryDS(newValue: AdvancedListDataSource) {
        this.__categoryDS.set(newValue);
    }
    // 当前选中的子类（每个类目对应一组子类）
    private __selectedSubcategoryId: ObservedPropertySimplePU<string>;
    get selectedSubcategoryId() {
        return this.__selectedSubcategoryId.get();
    }
    set selectedSubcategoryId(newValue: string) {
        this.__selectedSubcategoryId.set(newValue);
    }
    // 触摸位移（用于上拉加载更多）
    private startTouchOffsetY: number;
    private endTouchOffsetY: number;
    // 下拉刷新回调（精选）
    private async onHomeRefresh(): Promise<void> {
        this.refreshStatus = true;
        await new Promise<void>((resolve) => setTimeout(resolve, REFRESH_TIME));
        this.refreshStatus = false;
    }
    // 下拉刷新回调（分类）
    private async onCategoryRefresh(): Promise<void> {
        this.refreshStatus = true;
        await new Promise<void>((resolve) => setTimeout(resolve, REFRESH_TIME));
        this.refreshStatus = false;
    }
    private handleHomeTouch(event?: TouchEvent): void {
        if (event === undefined) {
            return;
        }
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
    private handleCategoryTouch(event?: TouchEvent): void {
        if (event === undefined) {
            return;
        }
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
    homeContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.homeScroller);
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
            Scroll.width(LAYOUT_WIDTH_OR_HEIGHT);
            Scroll.height(LAYOUT_WIDTH_OR_HEIGHT);
            Scroll.layoutWeight(1);
            Scroll.id(`home-${this.homeScrollKey}`);
            Scroll.onTouch((event?: TouchEvent) => this.handleHomeTouch(event));
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.padding({ top: 0 });
            Column.constraintSize({ minHeight: LAYOUT_WIDTH_OR_HEIGHT });
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SearchAndFilterBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 105, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SearchAndFilterBar" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new WaterfallList(this, { mode: 'home' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 106, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mode: 'home'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mode: 'home'
                    });
                }
            }, { name: "WaterfallList" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontSize(NORMAL_FONT_SIZE);
            Text.fontColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
    categoryContent(index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.categoryScroller);
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
            Scroll.width(LAYOUT_WIDTH_OR_HEIGHT);
            Scroll.height(LAYOUT_WIDTH_OR_HEIGHT);
            Scroll.layoutWeight(1);
            Scroll.id(`category-${this.categoryScrollKey}`);
            Scroll.onTouch((event?: TouchEvent) => this.handleCategoryTouch(event));
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.padding({ top: 0 });
            Column.constraintSize({ minHeight: LAYOUT_WIDTH_OR_HEIGHT });
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(LAYOUT_WIDTH_OR_HEIGHT);
            Row.padding({ left: 12, right: 12, top: 0 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel((this.selectedSubcategoryId === 'all') ? '✓ 全部' : '全部');
            Button.type((this.selectedSubcategoryId === 'all') ? ButtonType.Capsule : ButtonType.Normal);
            Button.onClick(() => {
                this.selectedSubcategoryId = 'all';
                const catId: string = (categories[index] !== undefined) ? (categories[index].id) : '';
                this.categoryDS.setCategory(catId, undefined);
            });
            Button.margin({ right: 8, bottom: 8 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const sub = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel((this.selectedSubcategoryId === sub.id) ? `✓ ${sub.name}` : sub.name);
                    Button.type((this.selectedSubcategoryId === sub.id) ? ButtonType.Capsule : ButtonType.Normal);
                    Button.onClick(() => {
                        this.selectedSubcategoryId = sub.id;
                        const catId: string = (categories[index] !== undefined) ? (categories[index].id) : '';
                        this.categoryDS.setCategory(catId, sub.id);
                    });
                    Button.margin({ right: 8, bottom: 8 });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, (categories[index] !== undefined) ? (categories[index].children ?? []) : [], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new WaterfallList(this, { mode: 'category' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 156, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mode: 'category'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mode: 'category'
                    });
                }
            }, { name: "WaterfallList" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontSize(NORMAL_FONT_SIZE);
            Text.fontColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
    firstTabBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.height(LAYOUT_WIDTH_OR_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontSize(this.tabsIndex === 0 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE);
            Text.fontColor(this.tabsIndex === 0 ? Color.Black : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.maxLines(MAX_LINES_TEXT);
            Text.minFontSize(this.tabsIndex === 0 ? NORMAL_FONT_SIZE : GOODS_EVALUATE_FONT_SIZE);
            Text.maxFontSize(this.tabsIndex === 0 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE);
        }, Text);
        Text.pop();
        Column.pop();
    }
    private homeTab(parent = null): void {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new RefreshLayout(this, {
                        triggerOffset: MAX_OFFSET_Y,
                        onRefresh: this.homeRefreshHandler(),
                        content: (): void => this.homeContent()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 195, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            triggerOffset: MAX_OFFSET_Y,
                            onRefresh: this.homeRefreshHandler(),
                            content: (): void => this.homeContent()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        triggerOffset: MAX_OFFSET_Y,
                        onRefresh: this.homeRefreshHandler()
                    });
                }
            }, { name: "RefreshLayout" });
        }
    }
    private categoryTab(index: number, parent = null): void {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new RefreshLayout(this, {
                        triggerOffset: MAX_OFFSET_Y,
                        onRefresh: this.categoryRefreshHandler(),
                        content: (): void => this.categoryContent(index)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 204, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            triggerOffset: MAX_OFFSET_Y,
                            onRefresh: this.categoryRefreshHandler(),
                            content: (): void => this.categoryContent(index)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        triggerOffset: MAX_OFFSET_Y,
                        onRefresh: this.categoryRefreshHandler()
                    });
                }
            }, { name: "RefreshLayout" });
        }
    }
    private homeRefreshHandler(): RefreshHandler {
        return { run: (): Promise<void> | void => this.onHomeRefresh() };
    }
    private categoryRefreshHandler(): RefreshHandler {
        return { run: (): Promise<void> | void => this.onCategoryRefresh() };
    }
    otherTabBar(content: Resource, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.height(LAYOUT_WIDTH_OR_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(content);
            Text.fontSize(this.tabsIndex === index + 1 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE);
            Text.fontColor(this.tabsIndex === index + 1 ? Color.Black : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.maxLines(MAX_LINES_TEXT);
            Text.minFontSize(this.tabsIndex === index + 1 ? NORMAL_FONT_SIZE : GOODS_EVALUATE_FONT_SIZE);
            Text.maxFontSize(this.tabsIndex === index + 1 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE);
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create();
            Tabs.onChange((index: number) => {
                // 记录当前 Tab 索引
                this.tabsIndex = index;
                // 当切换到分类 Tab 时，默认按该类目过滤；首个 Tab 恢复全部
                if (index === 0) {
                    this.selectedSubcategoryId = 'all';
                    this.homeDS.reset();
                    this.homeScrollKey++;
                    this.homeScroller.scrollTo({ xOffset: 0, yOffset: 0 });
                }
                else {
                    const catIdx: number = index - 1; // categories 与 initTabBarData 顺序一致
                    if (catIdx >= 0 && catIdx < categories.length) {
                        this.selectedSubcategoryId = 'all';
                        this.categoryDS.setCategory(categories[catIdx].id, undefined);
                        this.categoryScrollKey++;
                        this.categoryScroller.scrollTo({ xOffset: 0, yOffset: 0 });
                    }
                }
            });
            Tabs.vertical(false);
            Tabs.width(LAYOUT_WIDTH_OR_HEIGHT);
            Tabs.height(LAYOUT_WIDTH_OR_HEIGHT);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.homeTab.bind(this)();
            });
            TabContent.tabBar({ builder: this.firstTabBar.bind(this) });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 其它分类 Tab：三步内找到目标品类（点 Tab → 看子类 → 浏览商品）
            ForEach.create();
            const forEachItemGenFunction = (_item, index?: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        this.categoryTab.bind(this)(index !== undefined ? index : 0);
                    });
                    TabContent.tabBar({ builder: () => {
                            this.otherTabBar.call(this, item, index !== undefined ? index : 0);
                        } });
                }, TabContent);
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, initTabBarData, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        // 其它分类 Tab：三步内找到目标品类（点 Tab → 看子类 → 浏览商品）
        ForEach.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
