/*
 * 通用瀑布流组件：根据 mode 选择精选(home)或分类(category)数据源，左右两列模拟瀑布流。
 */

import { Goods } from '../models/Goods';
import AdvancedListDataSource from '../viewmodel/AdvancedListDataSource';
import * as commonConst from '../common/CommonConstants';

@Component
export default struct WaterfallList {
  // mode: 'home' 使用 homeDS；'category' 使用 categoryDS
  @Prop mode: 'home' | 'category' = 'home';
  @Consume homeDS: AdvancedListDataSource;
  @Consume categoryDS: AdvancedListDataSource;

  private getGoodsByMode(): Goods[] {
    const ds = (this.mode === 'category') ? this.categoryDS : this.homeDS;
    return ds.getGoods();
  }

  // 单个商品卡片
  @Builder
  GoodsCard(item: Goods) {
    Column() {
      Image(item.image)
        .width('100%')
        .height(item.imageHeight)
        .objectFit(ImageFit.Cover)
        .draggable(false)

      Text(item.name)
        .fontSize(commonConst.NORMAL_FONT_SIZE)
        .fontColor(Color.Black)
        .maxLines(1)
        .margin({ top: 6 })
      if (item.advertisingText) {
        Text(item.advertisingText)
          .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
          .fontColor($r('app.color.gray'))
          .maxLines(1)
      }

      Text(`¥${item.price}`)
        .fontColor($r('app.color.freshRed'))
        .fontSize(commonConst.NORMAL_FONT_SIZE)
        .margin({ top: 4 })
    }
    .width('100%')
    .padding(8)
    .backgroundColor(Color.White)
    .borderRadius(8)
  }

  build() {
    Row() {
      Column() {
        ForEach(this.getGoodsByMode().filter((_, idx: number) => idx % 2 === 0), (g: Goods) => {
          Column() {
            this.GoodsCard(g)
          }
          .width('100%')
          .margin({ bottom: 12 })
        })
      }
      .width('50%')

      Column() {
        ForEach(this.getGoodsByMode().filter((_, idx: number) => idx % 2 === 1), (g: Goods) => {
          Column() {
            this.GoodsCard(g)
          }
          .width('100%')
          .margin({ bottom: 12 })
        })
      }
      .width('50%')
    }
    .alignItems(VerticalAlign.Top)
    .width('100%')
  }
}
