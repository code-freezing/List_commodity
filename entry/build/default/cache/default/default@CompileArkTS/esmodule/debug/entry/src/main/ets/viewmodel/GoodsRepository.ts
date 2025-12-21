import type { Category } from '../models/Category';
import type { Goods } from '../models/Goods';
// 类目与子类示例
export const categories: Category[] = [
    { id: 'mobile', name: '手机', children: [
            { id: 'android', name: '安卓机' },
            { id: 'ios', name: '苹果机' },
            { id: 'accessory', name: '配件' }
        ] },
    { id: 'clothes', name: '服饰', children: [
            { id: 'men', name: '男装' },
            { id: 'women', name: '女装' },
            { id: 'kids', name: '童装' }
        ] },
    { id: 'wear', name: '穿戴', children: [
            { id: 'watch', name: '手表' },
            { id: 'band', name: '手环' }
        ] },
    { id: 'home', name: '家居', children: [
            { id: 'kitchen', name: '厨房' },
            { id: 'bedroom', name: '卧室' }
        ] }
];
// 顶层辅助函数：创建一个 Goods 对象（避免嵌套函数）
export function makeGoods(id: number, name: string, keywords: string[], price: number, ratingCount: number, image: Resource, imageHeight: number, advertisingText: string | undefined, categoryId: string, subcategoryId: string | undefined, tags: string[] | undefined, createdSeq: number | undefined): Goods {
    const g: Goods = {
        id: id,
        name: name,
        keywords: keywords,
        price: price,
        ratingCount: ratingCount,
        image: image,
        imageHeight: imageHeight,
        advertisingText: advertisingText,
        category: { categoryId: categoryId, subcategoryId: subcategoryId },
        tags: tags,
        createdSeq: createdSeq
    };
    return g;
}
// 构建一些示例商品（使用现有资源图片，模拟不同高度）
export function getAllGoods(): Goods[] {
    const list: Goods[] = [];
    let id: number = 1;
    // 手机类
    list.push(makeGoods(id++, '旗舰安卓手机', ['安卓', '旗舰', '5G'], 3999, 1289, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 180, '性能强劲，影像旗舰', 'mobile', 'android', ['热卖'], 1001));
    list.push(makeGoods(id++, '苹果手机', ['苹果', 'iOS', '新品'], 5999, 5234, { "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 260, '生态顺滑，体验极佳', 'mobile', 'ios', ['新品'], 1005));
    list.push(makeGoods(id++, '快充套装', ['充电器', '数据线', '配件'], 199, 532, { "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 140, '高效快充，安全稳定', 'mobile', 'accessory', ['配件'], 998));
    list.push(makeGoods(id++, '折叠屏手机', ['折叠', '旗舰', '5G'], 6999, 823, { "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 240, '大屏沉浸，便携折叠', 'mobile', 'android', ['旗舰'], 1007));
    list.push(makeGoods(id++, '长续航大电池', ['安卓', '续航', '大电池'], 2599, 612, { "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 200, '重度使用也安心', 'mobile', 'android', ['续航'], 999));
    list.push(makeGoods(id++, '蓝牙降噪耳机', ['耳机', '配件', '降噪'], 499, 934, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 180, '通勤好音质，长续航', 'mobile', 'accessory', ['配件'], 996));
    // 服饰类
    list.push(makeGoods(id++, '男士休闲T恤', ['男装', 'T恤', '纯棉'], 129, 221, { "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 220, '亲肤透气，日常必备', 'clothes', 'men', ['春季'], 980));
    list.push(makeGoods(id++, '女士连衣裙', ['女装', '连衣裙', '夏季'], 299, 457, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 300, '轻盈飘逸，夏日清新', 'clothes', 'women', ['夏季'], 1002));
    list.push(makeGoods(id++, '儿童运动套装', ['童装', '运动', '舒适'], 199, 112, { "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 160, '活力满满，成长相伴', 'clothes', 'kids', ['童趣'], 970));
    list.push(makeGoods(id++, '轻薄羽绒服', ['羽绒服', '保暖', '轻便'], 499, 380, { "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 260, '轻暖平衡，通勤必备', 'clothes', 'men', ['秋冬'], 994));
    list.push(makeGoods(id++, '运动跑鞋', ['跑鞋', '缓震', '透气'], 399, 742, { "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 220, '轻盈缓震，畅快开跑', 'clothes', 'men', ['运动'], 993));
    list.push(makeGoods(id++, '夏季防晒外套', ['防晒', '外套', '轻薄'], 189, 318, { "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 210, 'UPF防晒，清爽出行', 'clothes', 'women', ['夏季'], 991));
    // 穿戴类
    list.push(makeGoods(id++, '智能手表', ['手表', '健康', 'NFC'], 1099, 845, { "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 240, '腕上智能，健康守护', 'wear', 'watch', ['热卖'], 995));
    list.push(makeGoods(id++, '运动手环', ['手环', '运动', '续航'], 229, 392, { "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 180, '轻便舒适，持久续航', 'wear', 'band', ['性价比'], 990));
    list.push(makeGoods(id++, '儿童定位手表', ['儿童', '定位', '手表'], 499, 188, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 200, '安全守护，语音通话', 'wear', 'watch', ['童趣'], 986));
    list.push(makeGoods(id++, '潮流智能眼镜', ['眼镜', '智能', '穿戴'], 1299, 76, { "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 180, '时尚设计，智慧体验', 'wear', 'watch', ['新品'], 984));
    // 家居类
    list.push(makeGoods(id++, '厨房刀具套装', ['厨房', '刀具', '不锈钢'], 299, 184, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 200, '锋利耐用，烹饪好帮手', 'home', 'kitchen', ['实用'], 965));
    list.push(makeGoods(id++, '全棉床品四件套', ['卧室', '床品', '纯棉'], 369, 263, { "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 280, '柔软舒适，安心睡眠', 'home', 'bedroom', ['舒适'], 975));
    list.push(makeGoods(id++, '北欧落地灯', ['灯具', '卧室', '氛围'], 269, 145, { "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 240, '柔和光线，温馨氛围', 'home', 'bedroom', ['家居'], 982));
    list.push(makeGoods(id++, '多功能料理机', ['厨房', '料理机', '家电'], 699, 321, { "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 220, '一机多用，轻松备餐', 'home', 'kitchen', ['实用'], 981));
    list.push(makeGoods(id++, '收纳抽屉柜', ['收纳', '整理', '家居'], 159, 204, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, 200, '省空间，大容量', 'home', 'bedroom', ['整理'], 979));
    return list;
}
