if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WaterfallList_Params {
    mode?: 'home' | 'category';
    homeDS?: AdvancedListDataSource;
    categoryDS?: AdvancedListDataSource;
}
import type { Goods } from '../models/Goods';
import type AdvancedListDataSource from '../viewmodel/AdvancedListDataSource';
import * as commonConst from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
export default class WaterfallList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mode = new SynchedPropertySimpleOneWayPU(params.mode, this, "mode");
        this.__homeDS = this.initializeConsume("homeDS", "homeDS");
        this.__categoryDS = this.initializeConsume("categoryDS", "categoryDS");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WaterfallList_Params) {
        if (params.mode === undefined) {
            this.__mode.set('home');
        }
    }
    updateStateVars(params: WaterfallList_Params) {
        this.__mode.reset(params.mode);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mode.purgeDependencyOnElmtId(rmElmtId);
        this.__homeDS.purgeDependencyOnElmtId(rmElmtId);
        this.__categoryDS.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mode.aboutToBeDeleted();
        this.__homeDS.aboutToBeDeleted();
        this.__categoryDS.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // mode: 'home' 使用 homeDS；'category' 使用 categoryDS
    private __mode: SynchedPropertySimpleOneWayPU<'home' | 'category'>;
    get mode() {
        return this.__mode.get();
    }
    set mode(newValue: 'home' | 'category') {
        this.__mode.set(newValue);
    }
    private __homeDS: ObservedPropertyAbstractPU<AdvancedListDataSource>;
    get homeDS() {
        return this.__homeDS.get();
    }
    set homeDS(newValue: AdvancedListDataSource) {
        this.__homeDS.set(newValue);
    }
    private __categoryDS: ObservedPropertyAbstractPU<AdvancedListDataSource>;
    get categoryDS() {
        return this.__categoryDS.get();
    }
    set categoryDS(newValue: AdvancedListDataSource) {
        this.__categoryDS.set(newValue);
    }
    private getGoodsByMode(): Goods[] {
        const ds = (this.mode === 'category') ? this.categoryDS : this.homeDS;
        return ds.getGoods();
    }
    // 单个商品卡片
    GoodsCard(item: Goods, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(8);
            Column.backgroundColor(Color.White);
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(item.image);
            Image.width('100%');
            Image.height(item.imageHeight);
            Image.objectFit(ImageFit.Cover);
            Image.draggable(false);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.name);
            Text.fontSize(commonConst.NORMAL_FONT_SIZE);
            Text.fontColor(Color.Black);
            Text.maxLines(1);
            Text.margin({ top: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (item.advertisingText) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(item.advertisingText);
                        Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
                        Text.fontColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                        Text.maxLines(1);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`¥${item.price}`);
            Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontSize(commonConst.NORMAL_FONT_SIZE);
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Top);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('50%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const g = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.margin({ bottom: 12 });
                }, Column);
                this.GoodsCard.bind(this)(g);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.getGoodsByMode().filter((_, idx: number) => idx % 2 === 0), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('50%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const g = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.margin({ bottom: 12 });
                }, Column);
                this.GoodsCard.bind(this)(g);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.getGoodsByMode().filter((_, idx: number) => idx % 2 === 1), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
