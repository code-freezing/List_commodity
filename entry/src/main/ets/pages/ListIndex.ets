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

import TabBar from '../view/TabBarsComponent';
import { LAYOUT_WIDTH_OR_HEIGHT, STORE } from '../common/CommonConstants';

@Entry
@Component
struct ListIndex {
  build() {
    Row() {
      Navigation() {
        Column() {
          TabBar()
        }
        .width(LAYOUT_WIDTH_OR_HEIGHT)
        // 让内容区撑满可视高度，避免内部 Tab 内容被垂直居中
        .height(LAYOUT_WIDTH_OR_HEIGHT)
        .justifyContent(FlexAlign.Start)
        .alignItems(HorizontalAlign.Start)
      }
      // Navigation 也拉满，避免内容区域因父容器余量被居中
      .height(LAYOUT_WIDTH_OR_HEIGHT)
      .layoutWeight(1)
      .size({ width: LAYOUT_WIDTH_OR_HEIGHT, height: LAYOUT_WIDTH_OR_HEIGHT })
      .title(STORE)
      .titleMode(NavigationTitleMode.Mini)
    }
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .height(LAYOUT_WIDTH_OR_HEIGHT)
    // 占满父容器可用空间，防止内部导航/Tab 内容垂直居中
    .layoutWeight(1)
    .alignItems(VerticalAlign.Top)
    .justifyContent(FlexAlign.Start)
    .backgroundColor($r('app.color.primaryBgColor'))
    .padding({
      top: AppStorage.get<number>('statusBarHeight')
    })
  }
}