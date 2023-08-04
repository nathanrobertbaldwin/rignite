from app.models import db, Photo, environment, SCHEMA
from sqlalchemy.sql import text


def seed_photos():
    photo1 = Photo(
        product_id=1,
        url="https://techcrunch.com/wp-content/uploads/2022/06/keychron_q3.jpg",
    )

    photo2 = Photo(
        product_id=2,
        url="https://imageio.forbes.com/specials-images/imageserve/62e6ec9a1f931dd718e75384/Keychron-Q5-Custom-Mechanical-Keyboard-5/960x0.jpg",
    )

    photo3 = Photo(
        product_id=3, url="https://i.ytimg.com/vi/SjBsWYWyoNk/maxresdefault.jpg"
    )

    photo4 = Photo(
        product_id=4,
        url="https://imageio.forbes.com/specials-images/imageserve/62e6ec9a1f931dd718e75384/Keychron-Q5-Custom-Mechanical-Keyboard-5/960x0.jpg",
    )

    photo5 = Photo(
        product_id=5,
        url="https://cdn3.volusion.com/pzrh7.jc4ck/v/vspfiles/photos/ECOOL-R5-LT-2.jpg",
    )

    photo6 = Photo(
        product_id=6,
        url="https://www.ashkeebs.com/wp-content/uploads/2023/06/Red.jpg",
    )

    photo7 = Photo(
        product_id=7,
        url="https://cdn3.volusion.com/pzrh7.jc4ck/v/vspfiles/photos/ECOOL-R5-LT-6.jpg",
    )

    photo8 = Photo(
        product_id=8,
        url="https://c1.neweggimages.com/productimage/nb300/AKR3S200309xmW3c.jpg",
    )

    photo9 = Photo(
        product_id=9,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HTQ5TCD.jpg",
    )

    photo10 = Photo(
        product_id=10,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HU85DA0.jpg",
    )

    photo11 = Photo(
        product_id=11,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HSDUUE4.jpg",
    )

    photo12 = Photo(
        product_id=12,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HSDGR99.jpg",
    )

    photo13 = Photo(
        product_id=13,
        url="https://i5.walmartimages.com/asr/72d10573-1daa-41fc-acd5-ed56af63d2d1.a9afa9aff3343ef39f7aaa2b647ea7eb.jpeg",
    )

    photo14 = Photo(
        product_id=14,
        url="https://i5.walmartimages.com/asr/81ec9ce8-d3bb-481e-9276-db3e17958286.14446791f3b43158b7c8689a0a64af72.jpeg",
    )

    photo15 = Photo(
        product_id=15,
        url="https://i5.walmartimages.com/asr/73bf453e-4684-494a-a2d6-68dcfa641779.80ba397f98883b904771f081b81e7239.jpeg",
    )

    photo16 = Photo(
        product_id=16,
        url="https://i5.walmartimages.com/asr/531f0656-df7d-4247-b471-9988aecf29e2.07b7b4799e27b00a6ae3def4fba4a8af.jpeg",
    )

    photo17 = Photo(
        product_id=17,
        url="https://m.media-amazon.com/images/I/21+wTy5XwJL._AC_UF1000,1000_QL80_.jpg",
    )

    photo18 = Photo(
        product_id=18, url="https://m.media-amazon.com/images/I/713bgPy0HeL.jpg"
    )

    photo19 = Photo(
        product_id=19,
        url="https://i.ebayimg.com/images/g/qpcAAOSwCrpjzsRm/s-l1600.png",
    )

    photo20 = Photo(
        product_id=20,
        url="https://m.media-amazon.com/images/I/51QlJAw4HiL._AC_SX466_.jpg",
    )

    photo21 = Photo(
        product_id=21,
        url="https://m.media-amazon.com/images/I/61q+N1lizwL._AC_SL1500_.jpg",
    )

    photo22 = Photo(
        product_id=22,
        url="https://m.media-amazon.com/images/I/61c7Kb9foiL._AC_SL1500_.jpg",
    )

    photo23 = Photo(
        product_id=23,
        url="https://m.media-amazon.com/images/I/615Mpw2NJ2L._AC_SL1500_.jpg",
    )

    photo24 = Photo(
        product_id=24,
        url="https://m.media-amazon.com/images/I/81YGJ4g6A5L._AC_SL1500_.jpg",
    )

    photo25 = Photo(
        product_id=25, url="https://m.media-amazon.com/images/I/51KZcUQIyiS.jpg"
    )

    photo26 = Photo(
        product_id=26, url="https://m.media-amazon.com/images/I/51Lv97GAWZL._AC_.jpg"
    )

    photo27 = Photo(
        product_id=27, url="https://m.media-amazon.com/images/I/51YA8loHVFL._AC_.jpg"
    )

    photo28 = Photo(
        product_id=28, url="https://m.media-amazon.com/images/I/51zjERz4rEL._AC_.jpg"
    )

    photo29 = Photo(
        product_id=29,
        url="https://p4-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-01.1a802005376b6971.png",
    )

    photo30 = Photo(
        product_id=8,
        url="https://p4-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-03.252c3eca9888ee02.png",
    )

    photo31 = Photo(
        product_id=8,
        url="https://p2-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-02.2367c0fae38a0120.png",
    )

    photo32 = Photo(
        product_id=8,
        url="https://p2-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-06.090c35cffcf51fb4.png",
    )

    photo33 = Photo(
        product_id=1,
        url="https://techcrunch.com/wp-content/uploads/2022/06/keychron_q3.jpg",
    )

    photo34 = Photo(
        product_id=2,
        url="https://imageio.forbes.com/specials-images/imageserve/62e6ec9a1f931dd718e75384/Keychron-Q5-Custom-Mechanical-Keyboard-5/960x0.jpg",
    )

    photo35 = Photo(
        product_id=3, url="https://i.ytimg.com/vi/SjBsWYWyoNk/maxresdefault.jpg"
    )

    photo36 = Photo(
        product_id=4,
        url="https://imageio.forbes.com/specials-images/imageserve/62e6ec9a1f931dd718e75384/Keychron-Q5-Custom-Mechanical-Keyboard-5/960x0.jpg",
    )

    photo37 = Photo(
        product_id=5,
        url="https://cdn3.volusion.com/pzrh7.jc4ck/v/vspfiles/photos/ECOOL-R5-LT-2.jpg",
    )

    photo38 = Photo(
        product_id=6,
        url="https://www.ashkeebs.com/wp-content/uploads/2023/06/Red.jpg",
    )

    photo39 = Photo(
        product_id=7,
        url="https://cdn3.volusion.com/pzrh7.jc4ck/v/vspfiles/photos/ECOOL-R5-LT-6.jpg",
    )

    photo40 = Photo(
        product_id=8,
        url="https://c1.neweggimages.com/productimage/nb300/AKR3S200309xmW3c.jpg",
    )

    photo41 = Photo(
        product_id=9,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HTQ5TCD.jpg",
    )

    photo42 = Photo(
        product_id=10,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HU85DA0.jpg",
    )

    photo43 = Photo(
        product_id=11,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HSDUUE4.jpg",
    )

    photo44 = Photo(
        product_id=12,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HSDGR99.jpg",
    )

    photo45 = Photo(
        product_id=13,
        url="https://i5.walmartimages.com/asr/72d10573-1daa-41fc-acd5-ed56af63d2d1.a9afa9aff3343ef39f7aaa2b647ea7eb.jpeg",
    )

    photo46 = Photo(
        product_id=14,
        url="https://i5.walmartimages.com/asr/81ec9ce8-d3bb-481e-9276-db3e17958286.14446791f3b43158b7c8689a0a64af72.jpeg",
    )

    photo47 = Photo(
        product_id=15,
        url="https://i5.walmartimages.com/asr/73bf453e-4684-494a-a2d6-68dcfa641779.80ba397f98883b904771f081b81e7239.jpeg",
    )

    photo48 = Photo(
        product_id=16,
        url="https://i5.walmartimages.com/asr/531f0656-df7d-4247-b471-9988aecf29e2.07b7b4799e27b00a6ae3def4fba4a8af.jpeg",
    )

    photo49 = Photo(
        product_id=17,
        url="https://m.media-amazon.com/images/I/21+wTy5XwJL._AC_UF1000,1000_QL80_.jpg",
    )

    photo50 = Photo(
        product_id=18, url="https://m.media-amazon.com/images/I/713bgPy0HeL.jpg"
    )

    photo51 = Photo(
        product_id=19,
        url="https://i.ebayimg.com/images/g/qpcAAOSwCrpjzsRm/s-l1600.png",
    )

    photo52 = Photo(
        product_id=20,
        url="https://m.media-amazon.com/images/I/51QlJAw4HiL._AC_SX466_.jpg",
    )

    photo53 = Photo(
        product_id=21,
        url="https://m.media-amazon.com/images/I/61q+N1lizwL._AC_SL1500_.jpg",
    )

    photo54 = Photo(
        product_id=22,
        url="https://m.media-amazon.com/images/I/61c7Kb9foiL._AC_SL1500_.jpg",
    )

    photo55 = Photo(
        product_id=23,
        url="https://m.media-amazon.com/images/I/615Mpw2NJ2L._AC_SL1500_.jpg",
    )

    photo56 = Photo(
        product_id=24,
        url="https://m.media-amazon.com/images/I/81YGJ4g6A5L._AC_SL1500_.jpg",
    )

    photo57 = Photo(
        product_id=25, url="https://m.media-amazon.com/images/I/51KZcUQIyiS.jpg"
    )

    photo58 = Photo(
        product_id=26, url="https://m.media-amazon.com/images/I/51Lv97GAWZL._AC_.jpg"
    )

    photo59 = Photo(
        product_id=27, url="https://m.media-amazon.com/images/I/51YA8loHVFL._AC_.jpg"
    )

    photo60 = Photo(
        product_id=28, url="https://m.media-amazon.com/images/I/51zjERz4rEL._AC_.jpg"
    )

    photo61 = Photo(
        product_id=29,
        url="https://p4-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-01.1a802005376b6971.png",
    )

    photo62 = Photo(
        product_id=8,
        url="https://p4-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-03.252c3eca9888ee02.png",
    )

    photo63 = Photo(
        product_id=8,
        url="https://p2-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-02.2367c0fae38a0120.png",
    )

    photo64 = Photo(
        product_id=8,
        url="https://p2-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-06.090c35cffcf51fb4.png",
    )

    photo65 = Photo(
        product_id=1,
        url="https://techcrunch.com/wp-content/uploads/2022/06/keychron_q3.jpg",
    )

    photo66 = Photo(
        product_id=2,
        url="https://imageio.forbes.com/specials-images/imageserve/62e6ec9a1f931dd718e75384/Keychron-Q5-Custom-Mechanical-Keyboard-5/960x0.jpg",
    )

    photo67 = Photo(
        product_id=3, url="https://i.ytimg.com/vi/SjBsWYWyoNk/maxresdefault.jpg"
    )

    photo68 = Photo(
        product_id=4,
        url="https://imageio.forbes.com/specials-images/imageserve/62e6ec9a1f931dd718e75384/Keychron-Q5-Custom-Mechanical-Keyboard-5/960x0.jpg",
    )

    photo69 = Photo(
        product_id=5,
        url="https://cdn3.volusion.com/pzrh7.jc4ck/v/vspfiles/photos/ECOOL-R5-LT-2.jpg",
    )

    photo70 = Photo(
        product_id=6,
        url="https://www.ashkeebs.com/wp-content/uploads/2023/06/Red.jpg",
    )

    photo71 = Photo(
        product_id=7,
        url="https://cdn3.volusion.com/pzrh7.jc4ck/v/vspfiles/photos/ECOOL-R5-LT-6.jpg",
    )

    photo72 = Photo(
        product_id=8,
        url="https://c1.neweggimages.com/productimage/nb300/AKR3S200309xmW3c.jpg",
    )

    photo73 = Photo(
        product_id=9,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HTQ5TCD.jpg",
    )

    photo74 = Photo(
        product_id=10,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HU85DA0.jpg",
    )

    photo75 = Photo(
        product_id=11,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HSDUUE4.jpg",
    )

    photo76 = Photo(
        product_id=12,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HSDGR99.jpg",
    )

    photo77 = Photo(
        product_id=13,
        url="https://i5.walmartimages.com/asr/72d10573-1daa-41fc-acd5-ed56af63d2d1.a9afa9aff3343ef39f7aaa2b647ea7eb.jpeg",
    )

    photo78 = Photo(
        product_id=14,
        url="https://i5.walmartimages.com/asr/81ec9ce8-d3bb-481e-9276-db3e17958286.14446791f3b43158b7c8689a0a64af72.jpeg",
    )

    photo79 = Photo(
        product_id=15,
        url="https://i5.walmartimages.com/asr/73bf453e-4684-494a-a2d6-68dcfa641779.80ba397f98883b904771f081b81e7239.jpeg",
    )

    photo80 = Photo(
        product_id=16,
        url="https://i5.walmartimages.com/asr/531f0656-df7d-4247-b471-9988aecf29e2.07b7b4799e27b00a6ae3def4fba4a8af.jpeg",
    )

    photo81 = Photo(
        product_id=17,
        url="https://m.media-amazon.com/images/I/21+wTy5XwJL._AC_UF1000,1000_QL80_.jpg",
    )

    photo82 = Photo(
        product_id=18, url="https://m.media-amazon.com/images/I/713bgPy0HeL.jpg"
    )

    photo83 = Photo(
        product_id=19,
        url="https://i.ebayimg.com/images/g/qpcAAOSwCrpjzsRm/s-l1600.png",
    )

    photo84 = Photo(
        product_id=20,
        url="https://m.media-amazon.com/images/I/51QlJAw4HiL._AC_SX466_.jpg",
    )

    photo85 = Photo(
        product_id=21,
        url="https://m.media-amazon.com/images/I/61q+N1lizwL._AC_SL1500_.jpg",
    )

    photo86 = Photo(
        product_id=22,
        url="https://m.media-amazon.com/images/I/61c7Kb9foiL._AC_SL1500_.jpg",
    )

    photo87 = Photo(
        product_id=23,
        url="https://m.media-amazon.com/images/I/615Mpw2NJ2L._AC_SL1500_.jpg",
    )

    photo88 = Photo(
        product_id=24,
        url="https://m.media-amazon.com/images/I/81YGJ4g6A5L._AC_SL1500_.jpg",
    )

    photo89 = Photo(
        product_id=25, url="https://m.media-amazon.com/images/I/51KZcUQIyiS.jpg"
    )

    photo90 = Photo(
        product_id=26, url="https://m.media-amazon.com/images/I/51Lv97GAWZL._AC_.jpg"
    )

    photo91 = Photo(
        product_id=27, url="https://m.media-amazon.com/images/I/51YA8loHVFL._AC_.jpg"
    )

    photo92 = Photo(
        product_id=28, url="https://m.media-amazon.com/images/I/51zjERz4rEL._AC_.jpg"
    )

    photo93 = Photo(
        product_id=29,
        url="https://p4-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-01.1a802005376b6971.png",
    )

    photo94 = Photo(
        product_id=8,
        url="https://p4-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-03.252c3eca9888ee02.png",
    )

    photo95 = Photo(
        product_id=8,
        url="https://p2-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-02.2367c0fae38a0120.png",
    )

    photo96 = Photo(
        product_id=8,
        url="https://p2-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-06.090c35cffcf51fb4.png",
    )

    photo97 = Photo(
        product_id=1,
        url="https://techcrunch.com/wp-content/uploads/2022/06/keychron_q3.jpg",
    )

    photo98 = Photo(
        product_id=2,
        url="https://imageio.forbes.com/specials-images/imageserve/62e6ec9a1f931dd718e75384/Keychron-Q5-Custom-Mechanical-Keyboard-5/960x0.jpg",
    )

    photo99 = Photo(
        product_id=3, url="https://i.ytimg.com/vi/SjBsWYWyoNk/maxresdefault.jpg"
    )

    photo100 = Photo(
        product_id=4,
        url="https://imageio.forbes.com/specials-images/imageserve/62e6ec9a1f931dd718e75384/Keychron-Q5-Custom-Mechanical-Keyboard-5/960x0.jpg",
    )

    photo101 = Photo(
        product_id=5,
        url="https://cdn3.volusion.com/pzrh7.jc4ck/v/vspfiles/photos/ECOOL-R5-LT-2.jpg",
    )

    photo102 = Photo(
        product_id=6,
        url="https://www.ashkeebs.com/wp-content/uploads/2023/06/Red.jpg",
    )

    photo103 = Photo(
        product_id=7,
        url="https://cdn3.volusion.com/pzrh7.jc4ck/v/vspfiles/photos/ECOOL-R5-LT-6.jpg",
    )

    photo104 = Photo(
        product_id=8,
        url="https://c1.neweggimages.com/productimage/nb300/AKR3S200309xmW3c.jpg",
    )

    photo105 = Photo(
        product_id=9,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HTQ5TCD.jpg",
    )

    photo106 = Photo(
        product_id=10,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HU85DA0.jpg",
    )

    photo107 = Photo(
        product_id=11,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HSDUUE4.jpg",
    )

    photo108 = Photo(
        product_id=12,
        url="https://c1.neweggimages.com/ProductImageCompressAll1280/A4RES2302210HSDGR99.jpg",
    )

    photo109 = Photo(
        product_id=13,
        url="https://i5.walmartimages.com/asr/72d10573-1daa-41fc-acd5-ed56af63d2d1.a9afa9aff3343ef39f7aaa2b647ea7eb.jpeg",
    )

    photo110 = Photo(
        product_id=14,
        url="https://i5.walmartimages.com/asr/81ec9ce8-d3bb-481e-9276-db3e17958286.14446791f3b43158b7c8689a0a64af72.jpeg",
    )

    photo111 = Photo(
        product_id=15,
        url="https://i5.walmartimages.com/asr/73bf453e-4684-494a-a2d6-68dcfa641779.80ba397f98883b904771f081b81e7239.jpeg",
    )

    photo112 = Photo(
        product_id=16,
        url="https://i5.walmartimages.com/asr/531f0656-df7d-4247-b471-9988aecf29e2.07b7b4799e27b00a6ae3def4fba4a8af.jpeg",
    )

    photo113 = Photo(
        product_id=17,
        url="https://m.media-amazon.com/images/I/21+wTy5XwJL._AC_UF1000,1000_QL80_.jpg",
    )

    photo114 = Photo(
        product_id=18, url="https://m.media-amazon.com/images/I/713bgPy0HeL.jpg"
    )

    photo115 = Photo(
        product_id=19,
        url="https://i.ebayimg.com/images/g/qpcAAOSwCrpjzsRm/s-l1600.png",
    )

    photo116 = Photo(
        product_id=20,
        url="https://m.media-amazon.com/images/I/51QlJAw4HiL._AC_SX466_.jpg",
    )

    photo117 = Photo(
        product_id=21,
        url="https://m.media-amazon.com/images/I/61q+N1lizwL._AC_SL1500_.jpg",
    )

    photo118 = Photo(
        product_id=22,
        url="https://m.media-amazon.com/images/I/61c7Kb9foiL._AC_SL1500_.jpg",
    )

    photo119 = Photo(
        product_id=23,
        url="https://m.media-amazon.com/images/I/615Mpw2NJ2L._AC_SL1500_.jpg",
    )

    photo120 = Photo(
        product_id=24,
        url="https://m.media-amazon.com/images/I/81YGJ4g6A5L._AC_SL1500_.jpg",
    )

    photo121 = Photo(
        product_id=25, url="https://m.media-amazon.com/images/I/51KZcUQIyiS.jpg"
    )

    photo122 = Photo(
        product_id=26, url="https://m.media-amazon.com/images/I/51Lv97GAWZL._AC_.jpg"
    )

    photo123 = Photo(
        product_id=27, url="https://m.media-amazon.com/images/I/51YA8loHVFL._AC_.jpg"
    )

    photo124 = Photo(
        product_id=28, url="https://m.media-amazon.com/images/I/51zjERz4rEL._AC_.jpg"
    )

    photo125 = Photo(
        product_id=29,
        url="https://p4-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-01.1a802005376b6971.png",
    )

    photo126 = Photo(
        product_id=8,
        url="https://p4-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-03.252c3eca9888ee02.png",
    )

    photo127 = Photo(
        product_id=8,
        url="https://p2-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-02.2367c0fae38a0120.png",
    )

    photo128 = Photo(
        product_id=8,
        url="https://p2-ofp.static.pub/ShareResource/560x450/SSNP/GXD1C67963/GXD1C67963-500x400-06.090c35cffcf51fb4.png",
    )

    db.session.add_all(
        [
            photo1,
            photo2,
            photo3,
            photo4,
            photo5,
            photo6,
            photo7,
            photo8,
            photo9,
            photo10,
            photo11,
            photo12,
            photo13,
            photo14,
            photo15,
            photo16,
            photo16,
            photo17,
            photo18,
            photo19,
            photo20,
            photo21,
            photo22,
            photo23,
            photo24,
            photo25,
            photo26,
            photo27,
            photo28,
            photo29,
            photo30,
            photo31,
            photo32,
            photo33,
            photo34,
            photo35,
            photo36,
            photo37,
            photo38,
            photo39,
            photo40,
            photo41,
            photo42,
            photo43,
            photo44,
            photo45,
            photo46,
            photo47,
            photo48,
            photo49,
            photo50,
            photo51,
            photo52,
            photo53,
            photo54,
            photo55,
            photo56,
            photo57,
            photo58,
            photo59,
            photo60,
            photo61,
            photo62,
            photo63,
            photo64,
            photo65,
            photo66,
            photo67,
            photo68,
            photo69,
            photo70,
            photo71,
            photo72,
            photo73,
            photo74,
            photo75,
            photo76,
            photo77,
            photo78,
            photo79,
            photo80,
            photo81,
            photo82,
            photo83,
            photo84,
            photo85,
            photo86,
            photo87,
            photo88,
            photo89,
            photo90,
            photo91,
            photo92,
            photo93,
            photo94,
            photo95,
            photo96,
            photo97,
            photo98,
            photo99,
            photo100,
            photo101,
            photo102,
            photo103,
            photo104,
            photo105,
            photo106,
            photo107,
            photo108,
            photo109,
            photo110,
            photo111,
            photo112,
            photo113,
            photo114,
            photo115,
            photo116,
            photo117,
            photo118,
            photo119,
            photo120,
            photo121,
            photo122,
            photo123,
            photo124,
            photo125,
            photo126,
            photo127,
            photo128
        ]
    )

    db.session.commit()


def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photos"))

    db.session.commit()
