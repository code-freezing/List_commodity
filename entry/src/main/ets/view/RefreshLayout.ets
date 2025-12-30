import PutDownRefresh from './PutDownRefreshLayout';
import { MAX_OFFSET_Y, REFRESH_TIME } from '../common/CommonConstants';

export interface RefreshHandler {
  run: () => Promise<void> | void;
}

@Component
export default struct RefreshLayout {
  // 触发距离
  @Prop triggerOffset: number = MAX_OFFSET_Y;
  // 刷新回调（可异步）
  @Prop onRefresh: RefreshHandler = { run: () => {} };
  // 内容插槽
  @BuilderParam content: () => void = this.defaultContent;

  @State private pulling: boolean = false; // 超过触发距离时显示提示
  @State private refreshing: boolean = false; // 刷新中
  private startY: number = 0;
  private endY: number = 0;

  @LocalBuilder
  private defaultContent(): void {}

  @Builder
  private renderContent(): void {
    this.content();
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
    } finally {
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
        } else {
          this.pulling = false;
        }
        break;
      default:
        break;
    }
  }

  build() {
    Column() {
      // 条件渲染刷新提示
      if (this.pulling || this.refreshing) {
        PutDownRefresh({ refreshText: $r('app.string.refresh_text') })
      }
      // 主体内容
      this.renderContent();
    }
    .width('100%')
    .onTouch((event?: TouchEvent) => this.handleTouch(event))
  }
}
