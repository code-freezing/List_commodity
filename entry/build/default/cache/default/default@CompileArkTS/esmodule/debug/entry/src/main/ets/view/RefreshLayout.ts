if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
if (PUV2ViewBase.contextStack === undefined) {
    Reflect.set(PUV2ViewBase, "contextStack", []);
}
interface RefreshLayout_Params {
    triggerOffset?: number;
    onRefresh?: RefreshHandler;
    content?: () => void;
    pulling?: boolean;
    refreshing?: boolean;
    startY?: number;
    endY?: number;
}
import PutDownRefresh from "@bundle:com.example.list_harmony/entry/ets/view/PutDownRefreshLayout";
import { MAX_OFFSET_Y, REFRESH_TIME } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
export interface RefreshHandler {
    run: () => Promise<void> | void;
}
export default class RefreshLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__triggerOffset = new SynchedPropertySimpleOneWayPU(params.triggerOffset, this, "triggerOffset");
        this.__onRefresh = new SynchedPropertyObjectOneWayPU(params.onRefresh, this, "onRefresh");
        this.content = this.defaultContent;
        this.__pulling = new ObservedPropertySimplePU(false, this, "pulling");
        this.__refreshing = new ObservedPropertySimplePU(false, this, "refreshing");
        this.startY = 0;
        this.endY = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RefreshLayout_Params) {
        if (params.triggerOffset === undefined) {
            this.__triggerOffset.set(MAX_OFFSET_Y);
        }
        if (params.onRefresh === undefined) {
            this.__onRefresh.set({ run: () => { } });
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.pulling !== undefined) {
            this.pulling = params.pulling;
        }
        if (params.refreshing !== undefined) {
            this.refreshing = params.refreshing;
        }
        if (params.startY !== undefined) {
            this.startY = params.startY;
        }
        if (params.endY !== undefined) {
            this.endY = params.endY;
        }
    }
    updateStateVars(params: RefreshLayout_Params) {
        this.__triggerOffset.reset(params.triggerOffset);
        this.__onRefresh.reset(params.onRefresh);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__triggerOffset.purgeDependencyOnElmtId(rmElmtId);
        this.__onRefresh.purgeDependencyOnElmtId(rmElmtId);
        this.__pulling.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshing.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__triggerOffset.aboutToBeDeleted();
        this.__onRefresh.aboutToBeDeleted();
        this.__pulling.aboutToBeDeleted();
        this.__refreshing.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 触发距离
    private __triggerOffset: SynchedPropertySimpleOneWayPU<number>;
    get triggerOffset() {
        return this.__triggerOffset.get();
    }
    set triggerOffset(newValue: number) {
        this.__triggerOffset.set(newValue);
    }
    // 刷新回调（可异步）
    private __onRefresh: SynchedPropertySimpleOneWayPU<RefreshHandler>;
    get onRefresh() {
        return this.__onRefresh.get();
    }
    set onRefresh(newValue: RefreshHandler) {
        this.__onRefresh.set(newValue);
    }
    // 内容插槽
    private __content;
    private __pulling: ObservedPropertySimplePU<boolean>; // 超过触发距离时显示提示
    get pulling() {
        return this.__pulling.get();
    }
    set pulling(newValue: boolean) {
        this.__pulling.set(newValue);
    }
    private __refreshing: ObservedPropertySimplePU<boolean>; // 刷新中
    get refreshing() {
        return this.__refreshing.get();
    }
    set refreshing(newValue: boolean) {
        this.__refreshing.set(newValue);
    }
    private startY: number;
    private endY: number;
    defaultContent = () => { };
    private renderContent(parent = null): void {
        this.content.bind(this)();
    }
    private async doRefresh() {
        if (this.refreshing) {
            return;
        }
        this.refreshing = true;
        // 异常保护：无论回调是否挂起，超时后也收起
        const timeout = setTimeout(() => {
            this.refreshing = false;
            this.pulling = false;
        }, REFRESH_TIME * 2);
        try {
            await this.onRefresh.run();
        }
        finally {
            clearTimeout(timeout);
            this.refreshing = false;
            this.pulling = false;
        }
    }
    private handleTouch(event?: TouchEvent) {
        if (event === undefined) {
            return;
        }
        switch (event.type) {
            case TouchType.Down:
                this.startY = event.touches[0].y;
                this.endY = this.startY;
                break;
            case TouchType.Move:
                this.endY = event.touches[0].y;
                // 下拉为正向，超过触发距离则展示提示
                this.pulling = (this.endY - this.startY) > this.triggerOffset;
                break;
            case TouchType.Up:
            case TouchType.Cancel:
                if (this.pulling) {
                    this.doRefresh();
                }
                else {
                    this.pulling = false;
                }
                break;
            default:
                break;
        }
    }
    initialRender() {
        PUV2ViewBase.contextStack && PUV2ViewBase.contextStack.push(this);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.onTouch((event?: TouchEvent) => this.handleTouch(event));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 条件渲染刷新提示
            if (this.pulling || this.refreshing) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PutDownRefresh(this, { refreshText: { "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/RefreshLayout.ets", line: 81, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        refreshText: { "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    refreshText: { "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }
                                });
                            }
                        }, { name: "PutDownRefresh" });
                    }
                });
            }
            // 主体内容
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 主体内容
        this.renderContent.bind(this)();
        Column.pop();
        PUV2ViewBase.contextStack && PUV2ViewBase.contextStack.pop();
    }
    rerender() {
        PUV2ViewBase.contextStack && PUV2ViewBase.contextStack.push(this);
        this.updateDirtyElements();
        PUV2ViewBase.contextStack && PUV2ViewBase.contextStack.pop();
    }
}
