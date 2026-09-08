const ROOMS = {
  living:{label:'客厅',bg:'living.jpg',spawn:[52,72],partner:[61,72],dudu:[38,78],bubu:[72,77],hotspots:[
    {x:64,y:56,label:'坐沙发',action:'sit'},{x:25,y:48,label:'看电视',action:'tv'}]},
  kitchen:{label:'厨房',bg:'kitchen.jpg',spawn:[58,74],partner:[48,74],dudu:[72,78],bubu:[80,64],hotspots:[
    {x:35,y:42,label:'打开冰箱',action:'fridge'},
    {x:53,y:50,label:'做饭',action:'cook'},
    {x:78,y:60,label:'一起吃饭',action:'eat'},
    {x:69,y:38,label:'洗碗',action:'washDishes'}]},
  bedroom:{label:'卧室',bg:'bedroom.jpg',spawn:[56,76],partner:[45,76],dudu:[28,80],bubu:[77,73],hotspots:[
    {x:58,y:54,label:'睡觉',action:'sleep'},{x:72,y:36,label:'抱抱',action:'hug'}]},
  bathroom:{label:'浴室',bg:'bathroom.jpg',spawn:[58,78],partner:[46,78],dudu:[30,81],bubu:[73,78],hotspots:[
    {x:72,y:42,label:'洗澡',action:'shower'},{x:30,y:44,label:'洗漱',action:'groom'}]},
  study:{label:'书房',bg:'study.jpg',spawn:[56,78],partner:[43,78],dudu:[30,82],bubu:[72,70],hotspots:[
    {x:46,y:46,label:'一起学习',action:'study'}]},
  closet:{label:'衣帽间',bg:'closet.jpg',spawn:[52,78],partner:[42,78],dudu:[25,82],bubu:[74,78],hotspots:[
    {x:60,y:42,label:'换衣服',action:'closet'}]},
  balcony:{label:'阳台',bg:'balcony.jpg',spawn:[48,77],partner:[60,77],dudu:[31,82],bubu:[75,70],hotspots:[
    {x:57,y:54,label:'一起看风景',action:'talk'}]},
  garage:{label:'车库',bg:'garage.jpg',spawn:[52,80],partner:[62,80],dudu:[28,82],bubu:[78,80],hotspots:[
    {x:35,y:52,w:27,h:31,label:'黑色 Lexus',action:'blackcar',objectHit:true},
    {x:66,y:52,w:27,h:31,label:'白色 Lexus',action:'whitecar',objectHit:true}]},
  garden:{label:'院子',bg:'garden.jpg',spawn:[48,78],partner:[58,78],dudu:[72,78],bubu:[35,72],hotspots:[
    {x:30,y:58,label:'种花',action:'plant'},{x:46,y:62,label:'种菜',action:'vegetable'},{x:67,y:49,label:'浇水',action:'water'}]},
  lake:{label:'湖边',bg:'lake.jpg',spawn:[45,78],partner:[57,78],dudu:[30,78],bubu:[70,73],hotspots:[
    {x:57,y:55,label:'钓鱼',action:'fish'}]}
};
const ROOM_ORDER=['living','kitchen','bedroom','bathroom','study','closet','balcony','garage','garden','lake'];
const MAP_POS={living:[52,48],kitchen:[68,45],bedroom:[44,23],bathroom:[59,24],study:[73,24],closet:[52,24],balcony:[24,22],garage:[23,48],garden:[38,72],lake:[9,86]};
const SPRITES={
 elyn:{idle:'elyn-idle.png',down:'elyn-down.png',up:'elyn-up.png',left:'elyn-left.png',right:'elyn-right.png'},
 shawn:{idle:'shawn-idle.png',down:'shawn-down.png',up:'shawn-up.png',left:'shawn-left.png',right:'shawn-right.png'}
};


const OUTFITS={"shawn":[{"id":"s01","name":"奶油针织日常","cat":"日常","asset":"./assets/outfits_v3/shawn/s01/idle.png","top":"#dbe7f5","bottom":"#22272e","accent":"#f7f7f7","style":"shirt","shoes":"白运动鞋","socks":"白袜","accessory":"无","couple":null,"desc":"日常 · shirt · 白运动鞋","spriteBase":"./assets/outfits_v3/shawn/s01"},{"id":"s02","name":"蓝衬衫日常","cat":"日常","asset":"./assets/outfits_v3/shawn/s02/idle.png","top":"#b9cdeb","bottom":"#1f2530","accent":"#f5f5f5","style":"hoodie","shoes":"黑运动鞋","socks":"黑袜","accessory":"白袜","couple":null,"desc":"日常 · hoodie · 黑运动鞋","spriteBase":"./assets/outfits_v3/shawn/s02"},{"id":"s03","name":"黑白简约","cat":"日常","asset":"./assets/outfits_v3/shawn/s03/idle.png","top":"#f2f2ef","bottom":"#1e2024","accent":"#ffffff","style":"jacket","shoes":"皮鞋","socks":"无","accessory":"黑袜","couple":null,"desc":"日常 · jacket · 皮鞋","spriteBase":"./assets/outfits_v3/shawn/s03"},{"id":"s04","name":"浅灰卫衣","cat":"日常","asset":"./assets/outfits_v3/shawn/s04/idle.png","top":"#d8d4cf","bottom":"#27272a","accent":"#f4f4f4","style":"knit","shoes":"拖鞋","socks":"白袜","accessory":"棒球帽","couple":null,"desc":"日常 · knit · 拖鞋","spriteBase":"./assets/outfits_v3/shawn/s04"},{"id":"s05","name":"咖啡开衫","cat":"日常","asset":"./assets/outfits_v3/shawn/s05/idle.png","top":"#c9a98b","bottom":"#2d2b2a","accent":"#f6f1ea","style":"tee","shoes":"帆布鞋","socks":"黑袜","accessory":"针织帽","couple":null,"desc":"日常 · tee · 帆布鞋","spriteBase":"./assets/outfits_v3/shawn/s05"},{"id":"s06","name":"白T牛仔","cat":"日常","asset":"./assets/outfits_v3/shawn/s06/idle.png","top":"#f2f1ea","bottom":"#4b5965","accent":"#ffffff","style":"suit","shoes":"短靴","socks":"无","accessory":"眼镜","couple":null,"desc":"日常 · suit · 短靴","spriteBase":"./assets/outfits_v3/shawn/s06"},{"id":"s07","name":"绿系日常","cat":"日常","asset":"./assets/outfits_v3/shawn/s07/idle.png","top":"#879e84","bottom":"#28322c","accent":"#f4f1eb","style":"pajama","shoes":"白运动鞋","socks":"白袜","accessory":"手表","couple":null,"desc":"日常 · pajama · 白运动鞋","spriteBase":"./assets/outfits_v3/shawn/s07"},{"id":"s08","name":"学院日常","cat":"日常","asset":"./assets/outfits_v3/shawn/s08/idle.png","top":"#cfd5e2","bottom":"#373b46","accent":"#fff","style":"sport","shoes":"黑运动鞋","socks":"黑袜","accessory":"小包","couple":null,"desc":"日常 · sport · 黑运动鞋","spriteBase":"./assets/outfits_v3/shawn/s08"},{"id":"s09","name":"商务西装","cat":"工作","asset":"./assets/outfits_v3/shawn/s09/idle.png","top":"#22252c","bottom":"#17181c","accent":"#f3f3f3","style":"shirt","shoes":"皮鞋","socks":"无","accessory":"无","couple":null,"desc":"工作 · shirt · 皮鞋","spriteBase":"./assets/outfits_v3/shawn/s09"},{"id":"s10","name":"办公室衬衫","cat":"工作","asset":"./assets/outfits_v3/shawn/s10/idle.png","top":"#e6edf5","bottom":"#333b45","accent":"#f7f7f7","style":"hoodie","shoes":"拖鞋","socks":"白袜","accessory":"白袜","couple":null,"desc":"工作 · hoodie · 拖鞋","spriteBase":"./assets/outfits_v3/shawn/s10"},{"id":"s11","name":"Smart Casual","cat":"工作","asset":"./assets/outfits_v3/shawn/s11/idle.png","top":"#c4d0db","bottom":"#252a31","accent":"#fafafa","style":"jacket","shoes":"帆布鞋","socks":"黑袜","accessory":"黑袜","couple":null,"desc":"工作 · jacket · 帆布鞋","spriteBase":"./assets/outfits_v3/shawn/s11"},{"id":"s12","name":"深灰工作装","cat":"工作","asset":"./assets/outfits_v3/shawn/s12/idle.png","top":"#4f5865","bottom":"#1d2126","accent":"#f5f5f5","style":"knit","shoes":"短靴","socks":"无","accessory":"棒球帽","couple":null,"desc":"工作 · knit · 短靴","spriteBase":"./assets/outfits_v3/shawn/s12"},{"id":"s13","name":"蓝黑通勤","cat":"工作","asset":"./assets/outfits_v3/shawn/s13/idle.png","top":"#657891","bottom":"#222831","accent":"#f6f6f6","style":"tee","shoes":"白运动鞋","socks":"白袜","accessory":"针织帽","couple":null,"desc":"工作 · tee · 白运动鞋","spriteBase":"./assets/outfits_v3/shawn/s13"},{"id":"s14","name":"正式会议","cat":"工作","asset":"./assets/outfits_v3/shawn/s14/idle.png","top":"#15171c","bottom":"#111216","accent":"#fafafa","style":"suit","shoes":"黑运动鞋","socks":"黑袜","accessory":"眼镜","couple":null,"desc":"工作 · suit · 黑运动鞋","spriteBase":"./assets/outfits_v3/shawn/s14"},{"id":"s15","name":"宽松帽T","cat":"休闲","asset":"./assets/outfits_v3/shawn/s15/idle.png","top":"#b8c5d8","bottom":"#2d3138","accent":"#fff","style":"pajama","shoes":"皮鞋","socks":"无","accessory":"手表","couple":null,"desc":"休闲 · pajama · 皮鞋","spriteBase":"./assets/outfits_v3/shawn/s15"},{"id":"s16","name":"棒球休闲","cat":"休闲","asset":"./assets/outfits_v3/shawn/s16/idle.png","top":"#2f3742","bottom":"#20252b","accent":"#fff","style":"sport","shoes":"拖鞋","socks":"白袜","accessory":"小包","couple":null,"desc":"休闲 · sport · 拖鞋","spriteBase":"./assets/outfits_v3/shawn/s16"},{"id":"s17","name":"牛仔外套","cat":"休闲","asset":"./assets/outfits_v3/shawn/s17/idle.png","top":"#58708a","bottom":"#23272c","accent":"#f7f7f7","style":"shirt","shoes":"帆布鞋","socks":"黑袜","accessory":"无","couple":null,"desc":"休闲 · shirt · 帆布鞋","spriteBase":"./assets/outfits_v3/shawn/s17"},{"id":"s18","name":"运动休闲","cat":"休闲","asset":"./assets/outfits_v3/shawn/s18/idle.png","top":"#8fa6b4","bottom":"#262b31","accent":"#fff","style":"hoodie","shoes":"短靴","socks":"无","accessory":"白袜","couple":null,"desc":"休闲 · hoodie · 短靴","spriteBase":"./assets/outfits_v3/shawn/s18"},{"id":"s19","name":"周末咖啡","cat":"休闲","asset":"./assets/outfits_v3/shawn/s19/idle.png","top":"#c7b39e","bottom":"#3b332c","accent":"#f9f7f2","style":"jacket","shoes":"白运动鞋","socks":"白袜","accessory":"黑袜","couple":null,"desc":"休闲 · jacket · 白运动鞋","spriteBase":"./assets/outfits_v3/shawn/s19"},{"id":"s20","name":"街头黑系","cat":"休闲","asset":"./assets/outfits_v3/shawn/s20/idle.png","top":"#25272c","bottom":"#141518","accent":"#f5f5f5","style":"knit","shoes":"黑运动鞋","socks":"黑袜","accessory":"棒球帽","couple":null,"desc":"休闲 · knit · 黑运动鞋","spriteBase":"./assets/outfits_v3/shawn/s20"},{"id":"s21","name":"蓝格睡衣","cat":"睡衣","asset":"./assets/outfits_v3/shawn/s21/idle.png","top":"#8aa1bd","bottom":"#4f5968","accent":"#eef3f8","style":"pajama","shoes":"皮鞋","socks":"无","accessory":"针织帽","couple":null,"desc":"睡衣 · pajama · 皮鞋","spriteBase":"./assets/outfits_v3/shawn/s21"},{"id":"s22","name":"米白睡衣","cat":"睡衣","asset":"./assets/outfits_v3/shawn/s22/idle.png","top":"#e8e2d8","bottom":"#b8aa96","accent":"#fff","style":"pajama","shoes":"拖鞋","socks":"白袜","accessory":"眼镜","couple":null,"desc":"睡衣 · pajama · 拖鞋","spriteBase":"./assets/outfits_v3/shawn/s22"},{"id":"s23","name":"熊熊睡衣","cat":"睡衣","asset":"./assets/outfits_v3/shawn/s23/idle.png","top":"#8ba0bd","bottom":"#404a59","accent":"#fff","style":"pajama","shoes":"帆布鞋","socks":"黑袜","accessory":"手表","couple":null,"desc":"睡衣 · pajama · 帆布鞋","spriteBase":"./assets/outfits_v3/shawn/s23"},{"id":"s24","name":"深蓝家居服","cat":"睡衣","asset":"./assets/outfits_v3/shawn/s24/idle.png","top":"#56677e","bottom":"#323944","accent":"#eef2f7","style":"pajama","shoes":"短靴","socks":"无","accessory":"小包","couple":null,"desc":"睡衣 · pajama · 短靴","spriteBase":"./assets/outfits_v3/shawn/s24"},{"id":"s25","name":"冬日绒睡衣","cat":"睡衣","asset":"./assets/outfits_v3/shawn/s25/idle.png","top":"#d9d0c3","bottom":"#9c8d7a","accent":"#fff","style":"pajama","shoes":"白运动鞋","socks":"白袜","accessory":"无","couple":null,"desc":"睡衣 · pajama · 白运动鞋","spriteBase":"./assets/outfits_v3/shawn/s25"},{"id":"s26","name":"黑色礼服","cat":"礼服","asset":"./assets/outfits_v3/shawn/s26/idle.png","top":"#16181d","bottom":"#101115","accent":"#f7f7f7","style":"suit","shoes":"黑运动鞋","socks":"黑袜","accessory":"白袜","couple":null,"desc":"礼服 · suit · 黑运动鞋","spriteBase":"./assets/outfits_v3/shawn/s26"},{"id":"s27","name":"深蓝西装","cat":"礼服","asset":"./assets/outfits_v3/shawn/s27/idle.png","top":"#1f2d46","bottom":"#151a25","accent":"#f5f5f5","style":"suit","shoes":"皮鞋","socks":"无","accessory":"黑袜","couple":null,"desc":"礼服 · suit · 皮鞋","spriteBase":"./assets/outfits_v3/shawn/s27"},{"id":"s28","name":"白色宴会装","cat":"礼服","asset":"./assets/outfits_v3/shawn/s28/idle.png","top":"#f3f1ea","bottom":"#c9b89e","accent":"#fff","style":"suit","shoes":"拖鞋","socks":"白袜","accessory":"棒球帽","couple":null,"desc":"礼服 · suit · 拖鞋","spriteBase":"./assets/outfits_v3/shawn/s28"},{"id":"s29","name":"晚宴黑金","cat":"礼服","asset":"./assets/outfits_v3/shawn/s29/idle.png","top":"#27251f","bottom":"#171615","accent":"#d8c08c","style":"suit","shoes":"帆布鞋","socks":"黑袜","accessory":"针织帽","couple":null,"desc":"礼服 · suit · 帆布鞋","spriteBase":"./assets/outfits_v3/shawn/s29"},{"id":"s30","name":"正式领结","cat":"礼服","asset":"./assets/outfits_v3/shawn/s30/idle.png","top":"#181a20","bottom":"#111216","accent":"#fff","style":"suit","shoes":"短靴","socks":"无","accessory":"眼镜","couple":null,"desc":"礼服 · suit · 短靴","spriteBase":"./assets/outfits_v3/shawn/s30"},{"id":"s31","name":"情侣粉蓝 01","cat":"情侣","asset":"./assets/outfits_v3/shawn/s31/idle.png","top":"#9eb8df","bottom":"#343b4a","accent":"#fff","style":"shirt","shoes":"白运动鞋","socks":"白袜","accessory":"手表","couple":"c1","desc":"情侣 · shirt · 白运动鞋","spriteBase":"./assets/outfits_v3/shawn/s31"},{"id":"s32","name":"情侣黑白 02","cat":"情侣","asset":"./assets/outfits_v3/shawn/s32/idle.png","top":"#f1f1ef","bottom":"#1f2024","accent":"#fff","style":"suit","shoes":"黑运动鞋","socks":"黑袜","accessory":"小包","couple":"c2","desc":"情侣 · suit · 黑运动鞋","spriteBase":"./assets/outfits_v3/shawn/s32"},{"id":"s33","name":"情侣奶油 03","cat":"情侣","asset":"./assets/outfits_v3/shawn/s33/idle.png","top":"#e9dfcf","bottom":"#6a5d50","accent":"#fff","style":"knit","shoes":"皮鞋","socks":"无","accessory":"无","couple":"c3","desc":"情侣 · knit · 皮鞋","spriteBase":"./assets/outfits_v3/shawn/s33"},{"id":"s34","name":"情侣学院 04","cat":"情侣","asset":"./assets/outfits_v3/shawn/s34/idle.png","top":"#8090ad","bottom":"#2e3440","accent":"#fff","style":"jacket","shoes":"拖鞋","socks":"白袜","accessory":"白袜","couple":"c4","desc":"情侣 · jacket · 拖鞋","spriteBase":"./assets/outfits_v3/shawn/s34"},{"id":"s35","name":"情侣睡衣 05","cat":"情侣","asset":"./assets/outfits_v3/shawn/s35/idle.png","top":"#99afd0","bottom":"#55647a","accent":"#fff","style":"pajama","shoes":"帆布鞋","socks":"黑袜","accessory":"黑袜","couple":"c5","desc":"情侣 · pajama · 帆布鞋","spriteBase":"./assets/outfits_v3/shawn/s35"},{"id":"s36","name":"情侣约会 06","cat":"情侣","asset":"./assets/outfits_v3/shawn/s36/idle.png","top":"#d6c1a7","bottom":"#403832","accent":"#fff","style":"shirt","shoes":"短靴","socks":"无","accessory":"棒球帽","couple":"c6","desc":"情侣 · shirt · 短靴","spriteBase":"./assets/outfits_v3/shawn/s36"},{"id":"s37","name":"篮球运动","cat":"运动","asset":"./assets/outfits_v3/shawn/s37/idle.png","top":"#1b1d22","bottom":"#1b1d22","accent":"#fff","style":"sport","shoes":"白运动鞋","socks":"白袜","accessory":"针织帽","couple":null,"desc":"运动 · sport · 白运动鞋","spriteBase":"./assets/outfits_v3/shawn/s37"},{"id":"s38","name":"跑步套装","cat":"运动","asset":"./assets/outfits_v3/shawn/s38/idle.png","top":"#65798d","bottom":"#252b31","accent":"#fff","style":"sport","shoes":"黑运动鞋","socks":"黑袜","accessory":"眼镜","couple":null,"desc":"运动 · sport · 黑运动鞋","spriteBase":"./assets/outfits_v3/shawn/s38"},{"id":"s39","name":"网球休闲","cat":"运动","asset":"./assets/outfits_v3/shawn/s39/idle.png","top":"#d9dfeb","bottom":"#34404a","accent":"#fff","style":"sport","shoes":"皮鞋","socks":"无","accessory":"手表","couple":null,"desc":"运动 · sport · 皮鞋","spriteBase":"./assets/outfits_v3/shawn/s39"},{"id":"s40","name":"健身黑系","cat":"运动","asset":"./assets/outfits_v3/shawn/s40/idle.png","top":"#202329","bottom":"#17191d","accent":"#fff","style":"sport","shoes":"拖鞋","socks":"白袜","accessory":"小包","couple":null,"desc":"运动 · sport · 拖鞋","spriteBase":"./assets/outfits_v3/shawn/s40"}],"elyn":[{"id":"e01","name":"粉白日常","cat":"日常","asset":"./assets/outfits_v3/elyn/e01/idle.png","top":"#efc1cd","bottom":"#f5eee8","accent":"#fff","style":"cardigan","shoes":"白运动鞋","socks":"白袜","accessory":"无","couple":null,"desc":"日常 · cardigan · 白运动鞋","spriteBase":"./assets/outfits_v3/elyn/e01"},{"id":"e02","name":"奶油针织","cat":"日常","asset":"./assets/outfits_v3/elyn/e02/idle.png","top":"#e9dfcf","bottom":"#efe7dd","accent":"#fff","style":"dress","shoes":"黑运动鞋","socks":"黑袜","accessory":"白袜","couple":null,"desc":"日常 · dress · 黑运动鞋","spriteBase":"./assets/outfits_v3/elyn/e02"},{"id":"e03","name":"碎花日常","cat":"日常","asset":"./assets/outfits_v3/elyn/e03/idle.png","top":"#f1c9d3","bottom":"#f6efe6","accent":"#fff","style":"blouse","shoes":"皮鞋","socks":"无","accessory":"黑袜","couple":null,"desc":"日常 · blouse · 皮鞋","spriteBase":"./assets/outfits_v3/elyn/e03"},{"id":"e04","name":"白衬衫短裙","cat":"日常","asset":"./assets/outfits_v3/elyn/e04/idle.png","top":"#f3f2ee","bottom":"#353943","accent":"#fff","style":"hoodie","shoes":"拖鞋","socks":"白袜","accessory":"棒球帽","couple":null,"desc":"日常 · hoodie · 拖鞋","spriteBase":"./assets/outfits_v3/elyn/e04"},{"id":"e05","name":"浅蓝日常","cat":"日常","asset":"./assets/outfits_v3/elyn/e05/idle.png","top":"#c7d8eb","bottom":"#eef1f3","accent":"#fff","style":"overall","shoes":"帆布鞋","socks":"黑袜","accessory":"针织帽","couple":null,"desc":"日常 · overall · 帆布鞋","spriteBase":"./assets/outfits_v3/elyn/e05"},{"id":"e06","name":"牛仔背带","cat":"日常","asset":"./assets/outfits_v3/elyn/e06/idle.png","top":"#7390ad","bottom":"#f0e7dd","accent":"#fff","style":"suit","shoes":"短靴","socks":"无","accessory":"眼镜","couple":null,"desc":"日常 · suit · 短靴","spriteBase":"./assets/outfits_v3/elyn/e06"},{"id":"e07","name":"米色开衫","cat":"日常","asset":"./assets/outfits_v3/elyn/e07/idle.png","top":"#ded0bf","bottom":"#f2ece4","accent":"#fff","style":"pajama","shoes":"白运动鞋","socks":"白袜","accessory":"手表","couple":null,"desc":"日常 · pajama · 白运动鞋","spriteBase":"./assets/outfits_v3/elyn/e07"},{"id":"e08","name":"学院日常","cat":"日常","asset":"./assets/outfits_v3/elyn/e08/idle.png","top":"#cbd3e4","bottom":"#454b59","accent":"#fff","style":"sport","shoes":"黑运动鞋","socks":"黑袜","accessory":"小包","couple":null,"desc":"日常 · sport · 黑运动鞋","spriteBase":"./assets/outfits_v3/elyn/e08"},{"id":"e09","name":"黑白通勤","cat":"工作","asset":"./assets/outfits_v3/elyn/e09/idle.png","top":"#f4f2ef","bottom":"#22262e","accent":"#fff","style":"cardigan","shoes":"皮鞋","socks":"无","accessory":"无","couple":null,"desc":"工作 · cardigan · 皮鞋","spriteBase":"./assets/outfits_v3/elyn/e09"},{"id":"e10","name":"办公室套装","cat":"工作","asset":"./assets/outfits_v3/elyn/e10/idle.png","top":"#d9d3cb","bottom":"#353943","accent":"#fff","style":"dress","shoes":"拖鞋","socks":"白袜","accessory":"白袜","couple":null,"desc":"工作 · dress · 拖鞋","spriteBase":"./assets/outfits_v3/elyn/e10"},{"id":"e11","name":"Smart Casual","cat":"工作","asset":"./assets/outfits_v3/elyn/e11/idle.png","top":"#cfd9df","bottom":"#2f343c","accent":"#fff","style":"blouse","shoes":"帆布鞋","socks":"黑袜","accessory":"黑袜","couple":null,"desc":"工作 · blouse · 帆布鞋","spriteBase":"./assets/outfits_v3/elyn/e11"},{"id":"e12","name":"奶油工作装","cat":"工作","asset":"./assets/outfits_v3/elyn/e12/idle.png","top":"#ede2d3","bottom":"#c9b9aa","accent":"#fff","style":"hoodie","shoes":"短靴","socks":"无","accessory":"棒球帽","couple":null,"desc":"工作 · hoodie · 短靴","spriteBase":"./assets/outfits_v3/elyn/e12"},{"id":"e13","name":"深色通勤","cat":"工作","asset":"./assets/outfits_v3/elyn/e13/idle.png","top":"#4b5565","bottom":"#20242b","accent":"#fff","style":"overall","shoes":"白运动鞋","socks":"白袜","accessory":"针织帽","couple":null,"desc":"工作 · overall · 白运动鞋","spriteBase":"./assets/outfits_v3/elyn/e13"},{"id":"e14","name":"正式会议","cat":"工作","asset":"./assets/outfits_v3/elyn/e14/idle.png","top":"#23262e","bottom":"#16181d","accent":"#fff","style":"suit","shoes":"黑运动鞋","socks":"黑袜","accessory":"眼镜","couple":null,"desc":"工作 · suit · 黑运动鞋","spriteBase":"./assets/outfits_v3/elyn/e14"},{"id":"e15","name":"粉色帽T","cat":"休闲","asset":"./assets/outfits_v3/elyn/e15/idle.png","top":"#e9b6c5","bottom":"#f0d8df","accent":"#fff","style":"pajama","shoes":"皮鞋","socks":"无","accessory":"手表","couple":null,"desc":"休闲 · pajama · 皮鞋","spriteBase":"./assets/outfits_v3/elyn/e15"},{"id":"e16","name":"宽松休闲","cat":"休闲","asset":"./assets/outfits_v3/elyn/e16/idle.png","top":"#e7ded2","bottom":"#b59f8a","accent":"#fff","style":"sport","shoes":"拖鞋","socks":"白袜","accessory":"小包","couple":null,"desc":"休闲 · sport · 拖鞋","spriteBase":"./assets/outfits_v3/elyn/e16"},{"id":"e17","name":"牛仔外套","cat":"休闲","asset":"./assets/outfits_v3/elyn/e17/idle.png","top":"#7a93ac","bottom":"#f1ece4","accent":"#fff","style":"cardigan","shoes":"帆布鞋","socks":"黑袜","accessory":"无","couple":null,"desc":"休闲 · cardigan · 帆布鞋","spriteBase":"./assets/outfits_v3/elyn/e17"},{"id":"e18","name":"运动休闲","cat":"休闲","asset":"./assets/outfits_v3/elyn/e18/idle.png","top":"#9eafbd","bottom":"#f1ede7","accent":"#fff","style":"dress","shoes":"短靴","socks":"无","accessory":"白袜","couple":null,"desc":"休闲 · dress · 短靴","spriteBase":"./assets/outfits_v3/elyn/e18"},{"id":"e19","name":"周末咖啡","cat":"休闲","asset":"./assets/outfits_v3/elyn/e19/idle.png","top":"#d2bda8","bottom":"#f0e9df","accent":"#fff","style":"blouse","shoes":"白运动鞋","socks":"白袜","accessory":"黑袜","couple":null,"desc":"休闲 · blouse · 白运动鞋","spriteBase":"./assets/outfits_v3/elyn/e19"},{"id":"e20","name":"黑系街头","cat":"休闲","asset":"./assets/outfits_v3/elyn/e20/idle.png","top":"#25262a","bottom":"#25262a","accent":"#fff","style":"hoodie","shoes":"黑运动鞋","socks":"黑袜","accessory":"棒球帽","couple":null,"desc":"休闲 · hoodie · 黑运动鞋","spriteBase":"./assets/outfits_v3/elyn/e20"},{"id":"e21","name":"粉格睡衣","cat":"睡衣","asset":"./assets/outfits_v3/elyn/e21/idle.png","top":"#edc1cb","bottom":"#f3dfe5","accent":"#fff","style":"pajama","shoes":"皮鞋","socks":"无","accessory":"针织帽","couple":null,"desc":"睡衣 · pajama · 皮鞋","spriteBase":"./assets/outfits_v3/elyn/e21"},{"id":"e22","name":"奶油睡衣","cat":"睡衣","asset":"./assets/outfits_v3/elyn/e22/idle.png","top":"#ede3d5","bottom":"#f4eee6","accent":"#fff","style":"pajama","shoes":"拖鞋","socks":"白袜","accessory":"眼镜","couple":null,"desc":"睡衣 · pajama · 拖鞋","spriteBase":"./assets/outfits_v3/elyn/e22"},{"id":"e23","name":"兔兔睡衣","cat":"睡衣","asset":"./assets/outfits_v3/elyn/e23/idle.png","top":"#f0cad8","bottom":"#f5e4e9","accent":"#fff","style":"pajama","shoes":"帆布鞋","socks":"黑袜","accessory":"手表","couple":null,"desc":"睡衣 · pajama · 帆布鞋","spriteBase":"./assets/outfits_v3/elyn/e23"},{"id":"e24","name":"蓝白家居服","cat":"睡衣","asset":"./assets/outfits_v3/elyn/e24/idle.png","top":"#c9d8e7","bottom":"#e9eef3","accent":"#fff","style":"pajama","shoes":"短靴","socks":"无","accessory":"小包","couple":null,"desc":"睡衣 · pajama · 短靴","spriteBase":"./assets/outfits_v3/elyn/e24"},{"id":"e25","name":"冬日绒睡衣","cat":"睡衣","asset":"./assets/outfits_v3/elyn/e25/idle.png","top":"#ded4c6","bottom":"#eee6db","accent":"#fff","style":"pajama","shoes":"白运动鞋","socks":"白袜","accessory":"无","couple":null,"desc":"睡衣 · pajama · 白运动鞋","spriteBase":"./assets/outfits_v3/elyn/e25"},{"id":"e26","name":"黑色晚礼服","cat":"礼服","asset":"./assets/outfits_v3/elyn/e26/idle.png","top":"#16181d","bottom":"#202127","accent":"#fff","style":"dress","shoes":"黑运动鞋","socks":"黑袜","accessory":"白袜","couple":null,"desc":"礼服 · dress · 黑运动鞋","spriteBase":"./assets/outfits_v3/elyn/e26"},{"id":"e27","name":"香槟礼服","cat":"礼服","asset":"./assets/outfits_v3/elyn/e27/idle.png","top":"#d9c4a8","bottom":"#f4ece1","accent":"#fff","style":"dress","shoes":"皮鞋","socks":"无","accessory":"黑袜","couple":null,"desc":"礼服 · dress · 皮鞋","spriteBase":"./assets/outfits_v3/elyn/e27"},{"id":"e28","name":"粉色宴会裙","cat":"礼服","asset":"./assets/outfits_v3/elyn/e28/idle.png","top":"#e8b8c9","bottom":"#f6e5eb","accent":"#fff","style":"dress","shoes":"拖鞋","socks":"白袜","accessory":"棒球帽","couple":null,"desc":"礼服 · dress · 拖鞋","spriteBase":"./assets/outfits_v3/elyn/e28"},{"id":"e29","name":"晚宴黑金","cat":"礼服","asset":"./assets/outfits_v3/elyn/e29/idle.png","top":"#2d2a25","bottom":"#171615","accent":"#d8c08c","style":"dress","shoes":"帆布鞋","socks":"黑袜","accessory":"针织帽","couple":null,"desc":"礼服 · dress · 帆布鞋","spriteBase":"./assets/outfits_v3/elyn/e29"},{"id":"e30","name":"白色正式裙","cat":"礼服","asset":"./assets/outfits_v3/elyn/e30/idle.png","top":"#f4f2ee","bottom":"#e6ddd3","accent":"#fff","style":"dress","shoes":"短靴","socks":"无","accessory":"眼镜","couple":null,"desc":"礼服 · dress · 短靴","spriteBase":"./assets/outfits_v3/elyn/e30"},{"id":"e31","name":"情侣粉蓝 01","cat":"情侣","asset":"./assets/outfits_v3/elyn/e31/idle.png","top":"#e9b8c7","bottom":"#9eb8df","accent":"#fff","style":"cardigan","shoes":"白运动鞋","socks":"白袜","accessory":"手表","couple":"c1","desc":"情侣 · cardigan · 白运动鞋","spriteBase":"./assets/outfits_v3/elyn/e31"},{"id":"e32","name":"情侣黑白 02","cat":"情侣","asset":"./assets/outfits_v3/elyn/e32/idle.png","top":"#f1f1ef","bottom":"#222429","accent":"#fff","style":"suit","shoes":"黑运动鞋","socks":"黑袜","accessory":"小包","couple":"c2","desc":"情侣 · suit · 黑运动鞋","spriteBase":"./assets/outfits_v3/elyn/e32"},{"id":"e33","name":"情侣奶油 03","cat":"情侣","asset":"./assets/outfits_v3/elyn/e33/idle.png","top":"#eadfcf","bottom":"#c8b39b","accent":"#fff","style":"knit","shoes":"皮鞋","socks":"无","accessory":"无","couple":"c3","desc":"情侣 · knit · 皮鞋","spriteBase":"./assets/outfits_v3/elyn/e33"},{"id":"e34","name":"情侣学院 04","cat":"情侣","asset":"./assets/outfits_v3/elyn/e34/idle.png","top":"#d0d8e7","bottom":"#354052","accent":"#fff","style":"jacket","shoes":"拖鞋","socks":"白袜","accessory":"白袜","couple":"c4","desc":"情侣 · jacket · 拖鞋","spriteBase":"./assets/outfits_v3/elyn/e34"},{"id":"e35","name":"情侣睡衣 05","cat":"情侣","asset":"./assets/outfits_v3/elyn/e35/idle.png","top":"#e6c2cf","bottom":"#6d7c91","accent":"#fff","style":"pajama","shoes":"帆布鞋","socks":"黑袜","accessory":"黑袜","couple":"c5","desc":"情侣 · pajama · 帆布鞋","spriteBase":"./assets/outfits_v3/elyn/e35"},{"id":"e36","name":"情侣约会 06","cat":"情侣","asset":"./assets/outfits_v3/elyn/e36/idle.png","top":"#d9c3a6","bottom":"#50443c","accent":"#fff","style":"dress","shoes":"短靴","socks":"无","accessory":"棒球帽","couple":"c6","desc":"情侣 · dress · 短靴","spriteBase":"./assets/outfits_v3/elyn/e36"},{"id":"e37","name":"瑜伽运动","cat":"运动","asset":"./assets/outfits_v3/elyn/e37/idle.png","top":"#c9ced8","bottom":"#d9dce2","accent":"#fff","style":"sport","shoes":"白运动鞋","socks":"白袜","accessory":"针织帽","couple":null,"desc":"运动 · sport · 白运动鞋","spriteBase":"./assets/outfits_v3/elyn/e37"},{"id":"e38","name":"跑步套装","cat":"运动","asset":"./assets/outfits_v3/elyn/e38/idle.png","top":"#70879a","bottom":"#293039","accent":"#fff","style":"sport","shoes":"黑运动鞋","socks":"黑袜","accessory":"眼镜","couple":null,"desc":"运动 · sport · 黑运动鞋","spriteBase":"./assets/outfits_v3/elyn/e38"},{"id":"e39","name":"网球裙","cat":"运动","asset":"./assets/outfits_v3/elyn/e39/idle.png","top":"#f0d9e0","bottom":"#eef0f2","accent":"#fff","style":"sport","shoes":"皮鞋","socks":"无","accessory":"手表","couple":null,"desc":"运动 · sport · 皮鞋","spriteBase":"./assets/outfits_v3/elyn/e39"},{"id":"e40","name":"健身黑系","cat":"运动","asset":"./assets/outfits_v3/elyn/e40/idle.png","top":"#222429","bottom":"#222429","accent":"#fff","style":"sport","shoes":"拖鞋","socks":"白袜","accessory":"小包","couple":null,"desc":"运动 · sport · 拖鞋","spriteBase":"./assets/outfits_v3/elyn/e40"}]};
const OUTFIT_CATS=['全部','日常','工作','休闲','睡衣','礼服','情侣','运动'];


const INGREDIENT_ART={"milk":"./assets/fridge/real/milk.png","orangeJuice":"./assets/fridge/real/orangeJuice.png","berryYogurt":"./assets/fridge/real/berryYogurt.png","plainYogurt":"./assets/fridge/real/berryYogurt.png","butter":"./assets/fridge/real/butter.png","cheese":"./assets/fridge/real/cheese.png","eggs":"./assets/fridge/real/eggs.png","strawberries":"./assets/fridge/real/strawberries.png","mushrooms":"./assets/fridge/real/mushrooms.png","tomatoes":"./assets/fridge/real/tomatoes.png","carrots":"./assets/fridge/real/carrots.png","onions":"./assets/fridge/real/onions.png","sauces":"./assets/fridge/real/sauces.png","chicken":"./assets/fridge/real/chicken.png","lettuce":"./assets/fridge/real/lettuce.png","kimchi":"./assets/fridge/real/lettuce.png"};
const REFRIGERATED_IDS=["milk","orangeJuice","berryYogurt","plainYogurt","butter","cheese","eggs","strawberries","mushrooms","tomatoes","carrots","onions","sauces","chicken","lettuce","cream","bacon","salmon","kimchi","lemon","greenOnion","avocado"];
const FISH_DATA=[{"id":"fish001","name":"银鳞小鲫","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish001.svg","habitat":"岩石区","minKg":0.2,"maxKg":1.4,"edible":true,"hue":6,"hue2":109,"pattern":"stripes","body":"oval"},{"id":"fish002","name":"青尾鲤","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish002.svg","habitat":"码头","minKg":0.25,"maxKg":1.45,"edible":true,"hue":271,"hue2":10,"pattern":"diamond","body":"round"},{"id":"fish003","name":"溪流罗非","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish003.svg","habitat":"深水区","minKg":0.3,"maxKg":1.5,"edible":true,"hue":174,"hue2":263,"pattern":"plain","body":"oval"},{"id":"fish004","name":"黄鳍小鲈","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish004.svg","habitat":"湖心","minKg":0.35,"maxKg":1.55,"edible":true,"hue":171,"hue2":259,"pattern":"diamond","body":"round"},{"id":"fish005","name":"河口白条","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish005.svg","habitat":"水草区","minKg":0.4,"maxKg":1.6,"edible":true,"hue":154,"hue2":233,"pattern":"wave","body":"high"},{"id":"fish006","name":"石纹泥鳅","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish006.svg","habitat":"码头","minKg":0.45,"maxKg":1.65,"edible":true,"hue":2,"hue2":146,"pattern":"spots","body":"long"},{"id":"fish007","name":"蓝鳃太阳鱼","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish007.svg","habitat":"码头","minKg":0.15,"maxKg":1.35,"edible":true,"hue":289,"hue2":325,"pattern":"plain","body":"oval"},{"id":"fish008","name":"浅水鲶鱼","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish008.svg","habitat":"码头","minKg":0.2,"maxKg":1.4,"edible":true,"hue":144,"hue2":288,"pattern":"plain","body":"long"},{"id":"fish009","name":"草岸鱼","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish009.svg","habitat":"水草区","minKg":0.25,"maxKg":1.45,"edible":true,"hue":298,"hue2":32,"pattern":"spots","body":"round"},{"id":"fish010","name":"小鳞鲤","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish010.svg","habitat":"码头","minKg":0.3,"maxKg":1.5,"edible":true,"hue":286,"hue2":53,"pattern":"stripes","body":"high"},{"id":"fish011","name":"斑点溪鱼","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish011.svg","habitat":"湖心","minKg":0.35,"maxKg":1.55,"edible":true,"hue":295,"hue2":28,"pattern":"plain","body":"oval"},{"id":"fish012","name":"红鳍鲫","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish012.svg","habitat":"浅滩","minKg":0.4,"maxKg":1.6,"edible":true,"hue":151,"hue2":263,"pattern":"wave","body":"long"},{"id":"fish013","name":"银腹鲦","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish013.svg","habitat":"码头","minKg":0.45,"maxKg":1.65,"edible":true,"hue":96,"hue2":233,"pattern":"plain","body":"oval"},{"id":"fish014","name":"水草鲈","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish014.svg","habitat":"岩石区","minKg":0.15,"maxKg":1.35,"edible":true,"hue":242,"hue2":294,"pattern":"wave","body":"long"},{"id":"fish015","name":"青背小鱼","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish015.svg","habitat":"湖心","minKg":0.2,"maxKg":1.4,"edible":true,"hue":289,"hue2":18,"pattern":"diamond","body":"high"},{"id":"fish016","name":"碎石鳅","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish016.svg","habitat":"水草区","minKg":0.25,"maxKg":1.45,"edible":true,"hue":24,"hue2":63,"pattern":"wave","body":"round"},{"id":"fish017","name":"河湾鲤","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish017.svg","habitat":"岩石区","minKg":0.3,"maxKg":1.5,"edible":true,"hue":198,"hue2":313,"pattern":"plain","body":"round"},{"id":"fish018","name":"小口鲶","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish018.svg","habitat":"水草区","minKg":0.35,"maxKg":1.55,"edible":true,"hue":347,"hue2":35,"pattern":"wave","body":"long"},{"id":"fish019","name":"浅金鲫","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish019.svg","habitat":"水草区","minKg":0.4,"maxKg":1.6,"edible":true,"hue":203,"hue2":328,"pattern":"spots","body":"high"},{"id":"fish020","name":"绿尾鲦","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish020.svg","habitat":"岩石区","minKg":0.45,"maxKg":1.65,"edible":true,"hue":251,"hue2":347,"pattern":"stripes","body":"oval"},{"id":"fish021","name":"圆斑太阳鱼","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish021.svg","habitat":"湖心","minKg":0.15,"maxKg":1.35,"edible":true,"hue":358,"hue2":65,"pattern":"spots","body":"oval"},{"id":"fish022","name":"长须小鲶","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish022.svg","habitat":"湖心","minKg":0.2,"maxKg":1.4,"edible":true,"hue":307,"hue2":10,"pattern":"plain","body":"high"},{"id":"fish023","name":"湖岸白鱼","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish023.svg","habitat":"岩石区","minKg":0.25,"maxKg":1.45,"edible":true,"hue":286,"hue2":337,"pattern":"wave","body":"high"},{"id":"fish024","name":"碎银鲤","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish024.svg","habitat":"码头","minKg":0.3,"maxKg":1.5,"edible":true,"hue":194,"hue2":241,"pattern":"stripes","body":"round"},{"id":"fish025","name":"麦穗鱼","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish025.svg","habitat":"湖心","minKg":0.35,"maxKg":1.55,"edible":true,"hue":57,"hue2":143,"pattern":"stripes","body":"high"},{"id":"fish026","name":"短鳍鲈","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish026.svg","habitat":"岩石区","minKg":0.4,"maxKg":1.6,"edible":true,"hue":207,"hue2":337,"pattern":"stripes","body":"oval"},{"id":"fish027","name":"红尾小鲤","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish027.svg","habitat":"湖心","minKg":0.45,"maxKg":1.65,"edible":true,"hue":155,"hue2":269,"pattern":"wave","body":"round"},{"id":"fish028","name":"灰纹鲫","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish028.svg","habitat":"浅滩","minKg":0.15,"maxKg":1.35,"edible":true,"hue":269,"hue2":27,"pattern":"stripes","body":"round"},{"id":"fish029","name":"湖草鱼","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish029.svg","habitat":"岩石区","minKg":0.2,"maxKg":1.4,"edible":true,"hue":301,"hue2":64,"pattern":"spots","body":"oval"},{"id":"fish030","name":"银线鱼","rarity":"普通","baseProb":76.0,"img":"./assets/fish/fish030.svg","habitat":"岩石区","minKg":0.25,"maxKg":1.45,"edible":true,"hue":198,"hue2":275,"pattern":"stripes","body":"round"},{"id":"fish031","name":"金线鲈","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish031.svg","habitat":"码头","minKg":0.3,"maxKg":2.8,"edible":true,"hue":86,"hue2":173,"pattern":"diamond","body":"oval"},{"id":"fish032","name":"红宝石鲫","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish032.svg","habitat":"水草区","minKg":0.35,"maxKg":2.85,"edible":true,"hue":163,"hue2":291,"pattern":"plain","body":"high"},{"id":"fish033","name":"花纹锦鲤","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish033.svg","habitat":"水草区","minKg":0.4,"maxKg":2.9,"edible":true,"hue":237,"hue2":324,"pattern":"plain","body":"long"},{"id":"fish034","name":"翡翠鳟","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish034.svg","habitat":"码头","minKg":0.45,"maxKg":2.95,"edible":true,"hue":280,"hue2":332,"pattern":"stripes","body":"high"},{"id":"fish035","name":"琥珀鲶","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish035.svg","habitat":"水草区","minKg":0.15,"maxKg":2.65,"edible":true,"hue":199,"hue2":273,"pattern":"wave","body":"oval"},{"id":"fish036","name":"蓝斑鲈","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish036.svg","habitat":"湖心","minKg":0.2,"maxKg":2.7,"edible":true,"hue":266,"hue2":36,"pattern":"spots","body":"high"},{"id":"fish037","name":"银月鳟","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish037.svg","habitat":"深水区","minKg":0.25,"maxKg":2.75,"edible":true,"hue":296,"hue2":344,"pattern":"stripes","body":"long"},{"id":"fish038","name":"黑背草鱼","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish038.svg","habitat":"浅滩","minKg":0.3,"maxKg":2.8,"edible":true,"hue":2,"hue2":45,"pattern":"stripes","body":"high"},{"id":"fish039","name":"红冠鲤","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish039.svg","habitat":"岩石区","minKg":0.35,"maxKg":2.85,"edible":true,"hue":128,"hue2":201,"pattern":"spots","body":"long"},{"id":"fish040","name":"玉带鱼","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish040.svg","habitat":"水草区","minKg":0.4,"maxKg":2.9,"edible":true,"hue":41,"hue2":160,"pattern":"plain","body":"long"},{"id":"fish041","name":"霜点鳟","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish041.svg","habitat":"岩石区","minKg":0.45,"maxKg":2.95,"edible":true,"hue":223,"hue2":280,"pattern":"stripes","body":"high"},{"id":"fish042","name":"青金鲫","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish042.svg","habitat":"码头","minKg":0.15,"maxKg":2.65,"edible":true,"hue":255,"hue2":306,"pattern":"plain","body":"oval"},{"id":"fish043","name":"铜鳞鲤","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish043.svg","habitat":"岩石区","minKg":0.2,"maxKg":2.7,"edible":true,"hue":310,"hue2":87,"pattern":"stripes","body":"round"},{"id":"fish044","name":"珍珠鲈","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish044.svg","habitat":"码头","minKg":0.25,"maxKg":2.75,"edible":true,"hue":316,"hue2":45,"pattern":"plain","body":"oval"},{"id":"fish045","name":"橙尾鳟","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish045.svg","habitat":"码头","minKg":0.3,"maxKg":2.8,"edible":true,"hue":102,"hue2":162,"pattern":"plain","body":"oval"},{"id":"fish046","name":"湖心大鲶","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish046.svg","habitat":"湖心","minKg":0.35,"maxKg":2.85,"edible":true,"hue":209,"hue2":244,"pattern":"diamond","body":"long"},{"id":"fish047","name":"紫鳍鲫","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish047.svg","habitat":"深水区","minKg":0.4,"maxKg":2.9,"edible":true,"hue":251,"hue2":352,"pattern":"plain","body":"high"},{"id":"fish048","name":"白玉鲤","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish048.svg","habitat":"深水区","minKg":0.45,"maxKg":2.95,"edible":true,"hue":281,"hue2":65,"pattern":"spots","body":"round"},{"id":"fish049","name":"翠斑鱼","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish049.svg","habitat":"码头","minKg":0.15,"maxKg":2.65,"edible":true,"hue":171,"hue2":247,"pattern":"diamond","body":"high"},{"id":"fish050","name":"镜面鲤","rarity":"优良","baseProb":18.0,"img":"./assets/fish/fish050.svg","habitat":"水草区","minKg":0.2,"maxKg":2.7,"edible":true,"hue":107,"hue2":234,"pattern":"spots","body":"oval"},{"id":"fish051","name":"樱花锦鲤","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish051.svg","habitat":"深水区","minKg":0.25,"maxKg":4.75,"edible":true,"hue":156,"hue2":282,"pattern":"stripes","body":"high"},{"id":"fish052","name":"雪纹鳟","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish052.svg","habitat":"浅滩","minKg":0.3,"maxKg":4.8,"edible":true,"hue":294,"hue2":14,"pattern":"wave","body":"round"},{"id":"fish053","name":"金鳍帝王鲈","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish053.svg","habitat":"岩石区","minKg":0.35,"maxKg":4.85,"edible":true,"hue":22,"hue2":105,"pattern":"diamond","body":"long"},{"id":"fish054","name":"蓝晶鲤","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish054.svg","habitat":"岩石区","minKg":0.4,"maxKg":4.9,"edible":true,"hue":51,"hue2":145,"pattern":"stripes","body":"round"},{"id":"fish055","name":"赤霞鳟","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish055.svg","habitat":"湖心","minKg":0.45,"maxKg":4.95,"edible":true,"hue":226,"hue2":342,"pattern":"spots","body":"long"},{"id":"fish056","name":"紫晶鲶","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish056.svg","habitat":"水草区","minKg":0.15,"maxKg":4.65,"edible":true,"hue":320,"hue2":10,"pattern":"diamond","body":"high"},{"id":"fish057","name":"翡翠龙鲤","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish057.svg","habitat":"水草区","minKg":0.2,"maxKg":4.7,"edible":true,"hue":162,"hue2":221,"pattern":"wave","body":"round"},{"id":"fish058","name":"月纹鲈","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish058.svg","habitat":"深水区","minKg":0.25,"maxKg":4.75,"edible":true,"hue":151,"hue2":209,"pattern":"spots","body":"long"},{"id":"fish059","name":"白金锦鲤","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish059.svg","habitat":"岩石区","minKg":0.3,"maxKg":4.8,"edible":true,"hue":304,"hue2":75,"pattern":"plain","body":"high"},{"id":"fish060","name":"黑曜鳟","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish060.svg","habitat":"浅滩","minKg":0.35,"maxKg":4.85,"edible":true,"hue":61,"hue2":161,"pattern":"stripes","body":"high"},{"id":"fish061","name":"银河鲫","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish061.svg","habitat":"码头","minKg":0.4,"maxKg":4.9,"edible":true,"hue":22,"hue2":95,"pattern":"plain","body":"oval"},{"id":"fish062","name":"红莲鲤","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish062.svg","habitat":"码头","minKg":0.45,"maxKg":4.95,"edible":true,"hue":303,"hue2":72,"pattern":"wave","body":"high"},{"id":"fish063","name":"冰蓝鲶","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish063.svg","habitat":"湖心","minKg":0.15,"maxKg":4.65,"edible":true,"hue":129,"hue2":221,"pattern":"wave","body":"long"},{"id":"fish064","name":"晨曦鲈","rarity":"稀有","baseProb":4.8,"img":"./assets/fish/fish064.svg","habitat":"浅滩","minKg":0.2,"maxKg":4.7,"edible":true,"hue":103,"hue2":219,"pattern":"spots","body":"high"},{"id":"fish065","name":"极光鳟","rarity":"史诗","baseProb":0.9,"img":"./assets/fish/fish065.svg","habitat":"浅滩","minKg":0.25,"maxKg":7.25,"edible":true,"hue":345,"hue2":68,"pattern":"plain","body":"oval"},{"id":"fish066","name":"星斑龙鲤","rarity":"史诗","baseProb":0.9,"img":"./assets/fish/fish066.svg","habitat":"浅滩","minKg":0.3,"maxKg":7.3,"edible":true,"hue":129,"hue2":188,"pattern":"stripes","body":"long"},{"id":"fish067","name":"幽蓝帝王鲈","rarity":"史诗","baseProb":0.9,"img":"./assets/fish/fish067.svg","habitat":"深水区","minKg":0.35,"maxKg":7.35,"edible":true,"hue":283,"hue2":29,"pattern":"diamond","body":"oval"},{"id":"fish068","name":"赤焰锦鲤","rarity":"史诗","baseProb":0.9,"img":"./assets/fish/fish068.svg","habitat":"浅滩","minKg":0.4,"maxKg":7.4,"edible":true,"hue":340,"hue2":78,"pattern":"diamond","body":"oval"},{"id":"fish069","name":"霜月巨鲶","rarity":"史诗","baseProb":0.9,"img":"./assets/fish/fish069.svg","habitat":"码头","minKg":0.45,"maxKg":7.45,"edible":true,"hue":82,"hue2":170,"pattern":"wave","body":"oval"},{"id":"fish070","name":"紫电鳟","rarity":"史诗","baseProb":0.9,"img":"./assets/fish/fish070.svg","habitat":"深水区","minKg":0.15,"maxKg":7.15,"edible":true,"hue":76,"hue2":164,"pattern":"wave","body":"high"},{"id":"fish071","name":"碧海镜鲤","rarity":"史诗","baseProb":0.9,"img":"./assets/fish/fish071.svg","habitat":"浅滩","minKg":0.2,"maxKg":7.2,"edible":true,"hue":249,"hue2":288,"pattern":"stripes","body":"high"},{"id":"fish072","name":"日蚀鲈","rarity":"史诗","baseProb":0.9,"img":"./assets/fish/fish072.svg","habitat":"浅滩","minKg":0.25,"maxKg":7.25,"edible":true,"hue":352,"hue2":62,"pattern":"plain","body":"oval"},{"id":"fish073","name":"虹光龙鱼","rarity":"史诗","baseProb":0.9,"img":"./assets/fish/fish073.svg","habitat":"浅滩","minKg":0.3,"maxKg":7.3,"edible":true,"hue":50,"hue2":182,"pattern":"stripes","body":"round"},{"id":"fish074","name":"黄金龙鲤","rarity":"传说","baseProb":0.28,"img":"./assets/fish/fish074.svg","habitat":"湖心","minKg":0.35,"maxKg":12.35,"edible":true,"hue":44,"hue2":169,"pattern":"wave","body":"long"},{"id":"fish075","name":"月辉帝王鳟","rarity":"传说","baseProb":0.28,"img":"./assets/fish/fish075.svg","habitat":"深水区","minKg":0.4,"maxKg":12.4,"edible":true,"hue":160,"hue2":285,"pattern":"wave","body":"round"},{"id":"fish076","name":"绯红凤凰鱼","rarity":"传说","baseProb":0.28,"img":"./assets/fish/fish076.svg","habitat":"湖心","minKg":0.45,"maxKg":12.45,"edible":true,"hue":72,"hue2":125,"pattern":"stripes","body":"long"},{"id":"fish077","name":"苍蓝皇冠鲈","rarity":"传说","baseProb":0.28,"img":"./assets/fish/fish077.svg","habitat":"深水区","minKg":0.15,"maxKg":12.15,"edible":true,"hue":103,"hue2":190,"pattern":"spots","body":"round"},{"id":"fish078","name":"星河锦鲤","rarity":"传说","baseProb":0.28,"img":"./assets/fish/fish078.svg","habitat":"深水区","minKg":0.2,"maxKg":12.2,"edible":true,"hue":155,"hue2":245,"pattern":"spots","body":"high"},{"id":"fish079","name":"永夜水晶鲶","rarity":"传说","baseProb":0.28,"img":"./assets/fish/fish079.svg","habitat":"湖心","minKg":0.25,"maxKg":12.25,"edible":true,"hue":97,"hue2":199,"pattern":"wave","body":"oval"},{"id":"fish080","name":"月神·星海龙鱼","rarity":"神话","baseProb":0.02,"img":"./assets/fish/fish080.svg","habitat":"深水区","minKg":0.3,"maxKg":12.3,"edible":true,"hue":245,"hue2":291,"pattern":"spots","body":"high"}];
const FISH_RARITY_ODDS={'普通':76,'优良':18,'稀有':4.8,'史诗':0.9,'传说':0.28,'神话':0.02};
const FISH_RARITY_COLORS={'普通':'#9aa8b0','优良':'#76ad7d','稀有':'#5193d1','史诗':'#8b65c9','传说':'#d79a2b','神话':'#ef6fb7'};
const DINING_CHAIRS=[
 {id:'chair1',name:'靠厨房左侧',x:64,y:62,pullX:-3,pullY:7,face:'right'},
 {id:'chair2',name:'靠厨房右侧',x:87,y:62,pullX:4,pullY:6,face:'left'},
 {id:'chair3',name:'餐桌左下',x:66,y:77,pullX:-2,pullY:7,face:'up'},
 {id:'chair4',name:'餐桌中下',x:76,y:80,pullX:0,pullY:8,face:'up'},
 {id:'chair5',name:'餐桌右下',x:86,y:78,pullX:2,pullY:7,face:'up'},
 {id:'chair6',name:'靠窗座位',x:91,y:69,pullX:5,pullY:4,face:'left'}
];

const PET_SPRITES={
 dudu:{idle:'dudu-idle.png',walk:'dudu-walk.png',run:'dudu-run.png',sit:'dudu-sit.png',lie:'dudu-lie.png',sleep:'dudu-sleep.png',eat:'dudu-eat.png',happy:'dudu-happy.png',play:'dudu-play.png'},
 bubu:{idle:'bubu-idle.png',walk:'bubu-walk.png',run:'bubu-run.png',sit:'bubu-sit.png',lie:'bubu-lie.png',sleep:'bubu-sleep.png',eat:'bubu-eat.png',happy:'bubu-happy.png',play:'bubu-play.png'}
};

const INGREDIENTS={
 milk:{label:'牛奶',emoji:'🥛',cat:'冷藏'},orangeJuice:{label:'橙汁',emoji:'🧃',cat:'饮料'},
 berryYogurt:{label:'莓果酸奶',emoji:'🥣',cat:'冷藏'},plainYogurt:{label:'原味酸奶',emoji:'🥣',cat:'冷藏'},
 butter:{label:'黄油',emoji:'🧈',cat:'冷藏'},cheese:{label:'芝士',emoji:'🧀',cat:'冷藏'},
 eggs:{label:'鸡蛋',emoji:'🥚',cat:'冷藏'},strawberries:{label:'草莓',emoji:'🍓',cat:'蔬果'},
 mushrooms:{label:'蘑菇',emoji:'🍄',cat:'蔬果'},tomatoes:{label:'番茄',emoji:'🍅',cat:'蔬果'},
 carrots:{label:'胡萝卜',emoji:'🥕',cat:'蔬果'},onions:{label:'洋葱',emoji:'🧅',cat:'蔬果'},
 sauces:{label:'酱料',emoji:'🫙',cat:'调味'},
 chicken:{label:'鸡肉',emoji:'🍗',cat:'肉类'},potatoes:{label:'马铃薯',emoji:'🥔',cat:'蔬果'},
 lettuce:{label:'生菜',emoji:'🥬',cat:'蔬果'},corn:{label:'玉米',emoji:'🌽',cat:'蔬果'},
 cream:{label:'鲜奶油',emoji:'🥛',cat:'冷藏'},bacon:{label:'培根',emoji:'🥓',cat:'肉类'},
 salmon:{label:'三文鱼',emoji:'🐟',cat:'肉类'},kimchi:{label:'泡菜',emoji:'🥬',cat:'冷藏'},
 lemon:{label:'柠檬',emoji:'🍋',cat:'蔬果'},greenOnion:{label:'葱',emoji:'🌿',cat:'蔬果'},
 avocado:{label:'牛油果',emoji:'🥑',cat:'蔬果'},rice:{label:'米饭',emoji:'🍚',cat:'储藏'},
 pasta:{label:'意面',emoji:'🍝',cat:'储藏'},noodles:{label:'面条',emoji:'🍜',cat:'储藏'},
 bread:{label:'面包',emoji:'🍞',cat:'储藏'},flour:{label:'面粉',emoji:'🌾',cat:'储藏'},
 sugar:{label:'砂糖',emoji:'🧂',cat:'储藏'},cocoa:{label:'可可粉',emoji:'🍫',cat:'储藏'},
 coffeeBeans:{label:'咖啡豆',emoji:'☕',cat:'储藏'},oil:{label:'食用油',emoji:'🫗',cat:'调味'}
};

const DEFAULT_FRIDGE_POSITIONS={};
Object.keys(INGREDIENTS).forEach((id,i)=>{
  const col=i%6,row=Math.floor(i/6);
  DEFAULT_FRIDGE_POSITIONS[id]=[13+col*15,15+row*14];
});

const FOOD_IMG={
 breakfast:'./assets/food/breakfast-plate.png',friedRice:'./assets/food/fried-rice.png',
 pasta:'./assets/food/cream-pasta.png',omelette:'./assets/food/omelette.png',
 tomatoEgg:'./assets/food/tomato-egg.png',ramen:'./assets/food/ramen.png',
 curry:'./assets/food/curry-rice.png',soup:'./assets/food/mushroom-soup.png',
 fries:'./assets/food/fries.png',cookies:'./assets/food/cookies.png',
 cake:'./assets/food/strawberry-cake.png',brownies:'./assets/food/brownies.png',
 wings:'./assets/food/chicken-wings.png',nuggets:'./assets/food/nuggets.png',
 cupcakes:'./assets/food/cupcakes.png',coffee:'./assets/food/coffee.png',
 latte:'./assets/food/latte.png',hotChocolate:'./assets/food/hot-chocolate.png'
};

const RECIPES={
 omelette:{label:'欧姆蛋',cat:'早餐',emoji:'🍳',img:FOOD_IMG.omelette,difficulty:'简单',ingredients:{eggs:2,milk:1,butter:1},steps:['crack','whisk','heat','season','plate']},
 tomatoEgg:{label:'番茄炒蛋',cat:'早餐',emoji:'🍅',img:FOOD_IMG.tomatoEgg,difficulty:'简单',ingredients:{eggs:2,tomatoes:1,sauces:1},steps:['crack','chop','whisk','heat','season','plate']},
 breakfastPlate:{label:'英式早餐盘',cat:'早餐',emoji:'🍳',img:FOOD_IMG.breakfast,difficulty:'中等',ingredients:{eggs:1,bacon:1,bread:1,tomatoes:1},steps:['crack','heat','flip','plate']},
 pancakes:{label:'松饼 Pancake',cat:'早餐',emoji:'🥞',img:FOOD_IMG.breakfast,difficulty:'中等',ingredients:{eggs:1,milk:1,flour:1,butter:1,sugar:1},steps:['crack','whisk','pour','heat','flip','plate']},
 frenchToast:{label:'法式吐司',cat:'早餐',emoji:'🍞',img:FOOD_IMG.breakfast,difficulty:'中等',ingredients:{eggs:1,milk:1,bread:2,butter:1},steps:['crack','whisk','dip','heat','flip','plate']},
 scrambledEggs:{label:'炒滑蛋',cat:'早餐',emoji:'🥚',img:FOOD_IMG.omelette,difficulty:'简单',ingredients:{eggs:2,milk:1,butter:1},steps:['crack','whisk','heat','stir','plate']},
 eggSandwich:{label:'鸡蛋三明治',cat:'早餐',emoji:'🥪',img:FOOD_IMG.breakfast,difficulty:'简单',ingredients:{eggs:1,bread:2,lettuce:1,sauces:1},steps:['crack','heat','chop','assemble']},
 avocadoToast:{label:'牛油果吐司',cat:'早餐',emoji:'🥑',img:FOOD_IMG.breakfast,difficulty:'简单',ingredients:{avocado:1,bread:1,eggs:1},steps:['chop','crack','heat','assemble']},

 friedRice:{label:'炒饭',cat:'主食',emoji:'🍚',img:FOOD_IMG.friedRice,difficulty:'中等',ingredients:{rice:1,eggs:1,carrots:1,onions:1,sauces:1},steps:['crack','chop','heat','flip','season','plate']},
 kimchiFriedRice:{label:'泡菜炒饭',cat:'主食',emoji:'🌶️',img:FOOD_IMG.friedRice,difficulty:'中等',ingredients:{rice:1,kimchi:1,eggs:1,greenOnion:1},steps:['crack','chop','heat','flip','season','plate']},
 curryRice:{label:'咖喱饭',cat:'主食',emoji:'🍛',img:FOOD_IMG.curry,difficulty:'中等',ingredients:{rice:1,chicken:1,carrots:1,onions:1,potatoes:1},steps:['chop','heat','stir','season','plate']},
 chickenChop:{label:'香煎鸡扒',cat:'主食',emoji:'🍗',img:FOOD_IMG.wings,difficulty:'困难',ingredients:{chicken:2,butter:1,sauces:1},steps:['season','heat','flip','heat','plate']},
 teriyakiChicken:{label:'照烧鸡肉',cat:'主食',emoji:'🍗',img:FOOD_IMG.wings,difficulty:'中等',ingredients:{chicken:2,sauces:2,greenOnion:1},steps:['chop','season','heat','flip','plate']},
 mushroomRisotto:{label:'蘑菇烩饭',cat:'主食',emoji:'🍄',img:FOOD_IMG.friedRice,difficulty:'困难',ingredients:{rice:1,mushrooms:2,butter:1,cheese:1,cream:1},steps:['chop','heat','stir','season','plate']},
 bibimbap:{label:'韩式拌饭',cat:'主食',emoji:'🥗',img:FOOD_IMG.friedRice,difficulty:'困难',ingredients:{rice:1,eggs:1,carrots:1,mushrooms:1,lettuce:1,sauces:1},steps:['chop','crack','heat','assemble','season']},
 grilledSalmon:{label:'香煎三文鱼',cat:'主食',emoji:'🐟',img:FOOD_IMG.wings,difficulty:'困难',ingredients:{salmon:1,butter:1,lemon:1},steps:['season','heat','flip','heat','plate']},

 creamPasta:{label:'奶油蘑菇意面',cat:'面食',emoji:'🍝',img:FOOD_IMG.pasta,difficulty:'中等',ingredients:{pasta:1,milk:1,mushrooms:1,cheese:1,butter:1},steps:['boil','chop','stir','heat','season','plate']},
 tomatoPasta:{label:'番茄意面',cat:'面食',emoji:'🍝',img:FOOD_IMG.pasta,difficulty:'中等',ingredients:{pasta:1,tomatoes:2,onions:1,sauces:1},steps:['boil','chop','heat','stir','season','plate']},
 aglioOlio:{label:'蒜香橄榄油意面',cat:'面食',emoji:'🍝',img:FOOD_IMG.pasta,difficulty:'中等',ingredients:{pasta:1,oil:1,greenOnion:1,sauces:1},steps:['boil','chop','heat','flip','season','plate']},
 ramen:{label:'拉面',cat:'面食',emoji:'🍜',img:FOOD_IMG.ramen,difficulty:'中等',ingredients:{noodles:1,eggs:1,mushrooms:1,greenOnion:1},steps:['boil','crack','chop','heat','assemble']},
 udon:{label:'炒乌冬',cat:'面食',emoji:'🍜',img:FOOD_IMG.ramen,difficulty:'中等',ingredients:{noodles:1,carrots:1,onions:1,sauces:1},steps:['chop','boil','heat','flip','season','plate']},
 macCheese:{label:'Mac & Cheese',cat:'面食',emoji:'🧀',img:FOOD_IMG.pasta,difficulty:'中等',ingredients:{pasta:1,milk:1,cheese:2,butter:1},steps:['boil','stir','heat','season','plate']},
 carbonara:{label:'Carbonara',cat:'面食',emoji:'🥓',img:FOOD_IMG.pasta,difficulty:'困难',ingredients:{pasta:1,eggs:1,bacon:1,cheese:1,cream:1},steps:['boil','crack','heat','stir','season','plate']},

 mushroomSoup:{label:'蘑菇浓汤',cat:'汤',emoji:'🥣',img:FOOD_IMG.soup,difficulty:'简单',ingredients:{milk:1,mushrooms:2,butter:1,cream:1},steps:['chop','heat','stir','season','pour']},
 tomatoSoup:{label:'番茄汤',cat:'汤',emoji:'🍅',img:FOOD_IMG.soup,difficulty:'简单',ingredients:{tomatoes:2,onions:1,cream:1},steps:['chop','heat','stir','season','pour']},
 cornSoup:{label:'玉米浓汤',cat:'汤',emoji:'🌽',img:FOOD_IMG.soup,difficulty:'简单',ingredients:{corn:2,milk:1,butter:1},steps:['heat','stir','season','pour']},
 chickenSoup:{label:'鸡肉蔬菜汤',cat:'汤',emoji:'🍲',img:FOOD_IMG.soup,difficulty:'中等',ingredients:{chicken:1,carrots:1,onions:1,potatoes:1},steps:['chop','heat','stir','season','pour']},

 fries:{label:'空气炸锅薯条',cat:'空气炸锅',emoji:'🍟',img:FOOD_IMG.fries,difficulty:'中等',ingredients:{potatoes:2,oil:1,sauces:1},steps:['chop','season','airfry','plate']},
 nuggets:{label:'鸡块 Nuggets',cat:'空气炸锅',emoji:'🍗',img:FOOD_IMG.nuggets,difficulty:'简单',ingredients:{chicken:1,flour:1,eggs:1},steps:['crack','coat','airfry','plate']},
 chickenWings:{label:'香辣鸡翅',cat:'空气炸锅',emoji:'🍗',img:FOOD_IMG.wings,difficulty:'中等',ingredients:{chicken:2,sauces:1,oil:1},steps:['season','airfry','shake','plate']},
 hashBrowns:{label:'薯饼 Hash Brown',cat:'空气炸锅',emoji:'🥔',img:FOOD_IMG.fries,difficulty:'中等',ingredients:{potatoes:2,flour:1,oil:1},steps:['chop','knead','airfry','plate']},

 cookies:{label:'曲奇',cat:'甜品',emoji:'🍪',img:FOOD_IMG.cookies,difficulty:'中等',ingredients:{eggs:1,butter:1,flour:1,sugar:1},steps:['crack','whisk','knead','oven','plate']},
 brownies:{label:'布朗尼',cat:'甜品',emoji:'🍫',img:FOOD_IMG.brownies,difficulty:'困难',ingredients:{eggs:2,butter:1,flour:1,sugar:1,cocoa:2},steps:['crack','whisk','pour','oven','plate']},
 strawberryCake:{label:'草莓蛋糕',cat:'甜品',emoji:'🍰',img:FOOD_IMG.cake,difficulty:'困难',ingredients:{eggs:2,milk:1,butter:1,flour:1,sugar:1,strawberries:2,cream:1},steps:['crack','whisk','pour','oven','decorate','plate']},
 cupcakes:{label:'杯子蛋糕',cat:'甜品',emoji:'🧁',img:FOOD_IMG.cupcakes,difficulty:'困难',ingredients:{eggs:1,milk:1,butter:1,flour:1,sugar:1,cream:1},steps:['crack','whisk','pour','oven','decorate']},
 crepes:{label:'草莓可丽饼',cat:'甜品',emoji:'🥞',img:FOOD_IMG.cake,difficulty:'中等',ingredients:{eggs:1,milk:1,flour:1,butter:1,strawberries:1},steps:['crack','whisk','pour','heat','flip','decorate']},

 coffee:{label:'手冲咖啡',cat:'饮料',emoji:'☕',img:FOOD_IMG.coffee,difficulty:'简单',ingredients:{coffeeBeans:1},steps:['grind','pour','brew']},
 latte:{label:'拿铁',cat:'饮料',emoji:'☕',img:FOOD_IMG.latte,difficulty:'中等',ingredients:{coffeeBeans:1,milk:1},steps:['grind','brew','steam','pour']},
 hotChocolate:{label:'热巧克力',cat:'饮料',emoji:'🍫',img:FOOD_IMG.hotChocolate,difficulty:'简单',ingredients:{milk:1,cocoa:1,sugar:1},steps:['heat','stir','pour']},
 strawberryMilk:{label:'草莓牛奶',cat:'饮料',emoji:'🍓',img:FOOD_IMG.latte,difficulty:'简单',ingredients:{milk:1,strawberries:2,sugar:1},steps:['chop','blend','pour']}
};

const STEP_LABELS={
 crack:'敲鸡蛋 · 力度',chop:'切菜 · 手势',whisk:'打蛋 / 搅拌',stir:'搅拌',
 heat:'火候 · 熟度',season:'调味',plate:'摆盘',flip:'翻锅 Timing',pour:'倒入',
 dip:'浸泡',assemble:'组合',boil:'煮沸',airfry:'空气炸锅',shake:'中途 Shake',
 coat:'裹粉',knead:'揉面 / 塑形',oven:'烤箱',decorate:'装饰',
 grind:'磨咖啡豆',brew:'冲煮',steam:'打奶泡',blend:'搅拌机'
};

const DEFAULT_FRIDGE={
 milk:8,orangeJuice:4,berryYogurt:3,plainYogurt:3,butter:8,cheese:8,eggs:18,strawberries:8,
 mushrooms:8,tomatoes:8,carrots:8,onions:8,sauces:10,chicken:10,potatoes:10,lettuce:6,corn:6,
 cream:6,bacon:6,salmon:5,kimchi:6,lemon:5,greenOnion:8,avocado:5,rice:10,pasta:10,noodles:10,
 bread:10,flour:12,sugar:12,cocoa:8,coffeeBeans:10,oil:10
};


const DAILY_TASK_POOL = [
 {id:'feed_dudu',title:'给 Dudu 喂食',event:'feedDudu',target:1,coins:35,xp:20,hint:'点击 Dudu 状态卡进行喂食'},
 {id:'brush_bubu',title:'给 Bubu 梳毛',event:'brushBubu',target:1,coins:35,xp:20,hint:'点击 Bubu 状态卡进行梳毛'},
 {id:'cook_meal',title:'完成 1 次料理',event:'cookMeal',target:1,coins:55,xp:35,hint:'厨房 → 做饭'},
 {id:'eat_together',title:'和 Shawn / Elyn 一起吃饭',event:'eatTogether',target:1,coins:60,xp:40,hint:'餐桌 → 一起吃'},
 {id:'water_plants',title:'给花园浇水',event:'waterPlants',target:1,coins:40,xp:25,hint:'院子 → 浇水'},
 {id:'plant_any',title:'种下一株植物',event:'plant',target:1,coins:45,xp:30,hint:'院子 → 种花 / 种菜'},
 {id:'fish_once',title:'去湖边钓 1 条鱼',event:'fish',target:1,coins:50,xp:30,hint:'湖边 → 钓鱼'},
 {id:'study_once',title:'学习一次',event:'study',target:1,coins:40,xp:25,hint:'书房 → 一起学习'},
 {id:'wash_dish',title:'洗干净 1 个盘子',event:'washDish',target:1,coins:45,xp:30,hint:'厨房 → 洗碗'},
 {id:'open_fridge',title:'检查一次冰箱',event:'openFridge',target:1,coins:25,xp:15,hint:'厨房 → 打开冰箱'},
 {id:'visit_lake',title:'去湖边散步',event:'visitLake',target:1,coins:35,xp:20,hint:'地图 → 湖边'},
 {id:'switch_char',title:'切换一次角色',event:'switchCharacter',target:1,coins:20,xp:15,hint:'点击“切换人物”'},
 {id:'drive_once',title:'开车出门一次',event:'driveCar',target:1,coins:55,xp:35,hint:'车库 → 选择车辆 → 开车'},
 {id:'wash_car',title:'洗一次车',event:'washCar',target:1,coins:45,xp:30,hint:'车库 → 洗车'},
 {id:'refuel_car',title:'给车加油',event:'refuelCar',target:1,coins:40,xp:25,hint:'车库 → 加油'}
];

const SPECIAL_TASK_POOL = [
 {id:'sp_perfect_chef',title:'完美主厨',desc:'做出 1 道 PERFECT 料理',event:'perfectCook',target:1,coins:350,xp:220},
 {id:'sp_rare_fish',title:'稀有猎手',desc:'钓到 1 条稀有或传说鱼',event:'rareFish',target:1,coins:400,xp:250},
 {id:'sp_date_night',title:'我们的晚餐',desc:'一起吃饭 3 次',event:'eatTogether',target:3,coins:300,xp:180},
 {id:'sp_green_thumb',title:'花园守护者',desc:'种下 5 株花或蔬菜',event:'plant',target:5,coins:320,xp:200},
 {id:'sp_clean_home',title:'闪闪发亮',desc:'洗干净 5 个盘子',event:'washDish',target:5,coins:280,xp:170},
 {id:'sp_lake_regular',title:'湖边常客',desc:'累计钓到 5 条鱼',event:'fish',target:5,coins:300,xp:190},
 {id:'sp_home_chef',title:'料理马拉松',desc:'完成 5 次料理',event:'cookMeal',target:5,coins:330,xp:210},
 {id:'sp_pet_day',title:'毛孩子的一天',desc:'喂 Dudu 和梳 Bubu 各 1 次',event:'petCareCombo',target:1,coins:260,xp:160},
 {id:'sp_road_trip',title:'Road Trip',desc:'累计完成 5 次开车行程',event:'driveCar',target:5,coins:500,xp:300},
 {id:'sp_showroom_clean',title:'像新车一样',desc:'完成 3 次洗车',event:'washCar',target:3,coins:380,xp:220}
];



const WEEKLY_TASK_POOL=[
 {id:'wk_cook10',title:'本周家庭主厨',desc:'完成 10 次料理',event:'cookMeal',target:10,coins:520,xp:320},
 {id:'wk_fish15',title:'湖边周记',desc:'钓到 15 条鱼',event:'fish',target:15,coins:480,xp:300},
 {id:'wk_perfect3',title:'Perfect Week',desc:'做出 3 道 PERFECT 料理',event:'perfectCook',target:3,coins:650,xp:420,love:5},
 {id:'wk_drive5',title:'本周出行',desc:'完成 5 次驾驶',event:'driveCar',target:5,coins:560,xp:330},
 {id:'wk_garden8',title:'花园周计划',desc:'种下 8 株植物',event:'plant',target:8,coins:420,xp:260},
 {id:'wk_clean8',title:'干净的家',desc:'洗干净 8 个盘子',event:'washDish',target:8,coins:360,xp:220}
];
const COUPLE_TASK_POOL=[
 {id:'cp_dinner',title:'一起吃饭',desc:'一起吃饭 2 次',event:'eatTogether',target:2,coins:140,xp:90,love:12},
 {id:'cp_hug',title:'今天抱抱',desc:'拥抱 2 次',event:'coupleHug',target:2,coins:80,xp:55,love:14},
 {id:'cp_view',title:'陪你看风景',desc:'一起看风景 1 次',event:'coupleTalk',target:1,coins:90,xp:60,love:10},
 {id:'cp_lake',title:'湖边小约会',desc:'一起到湖边 1 次',event:'visitLake',target:1,coins:120,xp:75,love:10}
];
const ACHIEVEMENTS=[
 {id:'ach_first_meal',title:'第一次下厨',desc:'完成第一道料理',event:'cookMeal',target:1,coins:80,xp:50},
 {id:'ach_perfect',title:'Perfect!',desc:'第一次做出 PERFECT',event:'perfectCook',target:1,coins:180,xp:120},
 {id:'ach_fish10',title:'小小钓手',desc:'累计钓到 10 条鱼',event:'fish',target:10,coins:180,xp:120},
 {id:'ach_rare',title:'闪闪发光',desc:'第一次钓到稀有以上鱼',event:'rareFish',target:1,coins:250,xp:180},
 {id:'ach_drive10',title:'Road Lover',desc:'累计驾驶 10 次',event:'driveCar',target:10,coins:220,xp:160},
 {id:'ach_chat20',title:'聊不完的话',desc:'发送 20 条对话',event:'sendChat',target:20,coins:100,xp:80},
 {id:'ach_hug10',title:'抱抱专家',desc:'拥抱 10 次',event:'coupleHug',target:10,coins:120,xp:90},
 {id:'ach_love500',title:'默契满满',desc:'Love 达到 500',condition:'love',target:500,coins:300,xp:220}
];
const LOVE_EVENT_BASE={eatTogether:4,coupleHug:2,coupleTalk:3,visitLake:2};

const state = Object.assign({started:false,room:'living',active:'elyn',positions:{},outfit:0,seeds:3,bait:4,weather:'晴天'}, JSON.parse(localStorage.getItem('worldRebuild1')||'{}'));

state.fridge=Object.assign({},DEFAULT_FRIDGE,state.fridge||{});
state.fridgePositions=Object.assign({},DEFAULT_FRIDGE_POSITIONS,state.fridgePositions||{});
state.preparedMeals=Array.isArray(state.preparedMeals)?state.preparedMeals:[];
state.dirtyDishes=Number.isFinite(state.dirtyDishes)?state.dirtyDishes:0;
state.coins=Number.isFinite(state.coins)?state.coins:1280;
state.xpTotal=Number.isFinite(state.xpTotal)?state.xpTotal:0;
state.dailyDate=state.dailyDate||'';
state.dailyTasks=Array.isArray(state.dailyTasks)?state.dailyTasks:[];
state.completedSpecialIds=Array.isArray(state.completedSpecialIds)?state.completedSpecialIds:[];
state.activeSpecial=state.activeSpecial||null;
state.love=Number.isFinite(state.love)?state.love:120;
state.weeklyKey=state.weeklyKey||'';state.weeklyTasks=Array.isArray(state.weeklyTasks)?state.weeklyTasks:[];
state.coupleDate=state.coupleDate||'';state.coupleTasks=Array.isArray(state.coupleTasks)?state.coupleTasks:[];
state.achievementIds=Array.isArray(state.achievementIds)?state.achievementIds:[];
state.eventStats=state.eventStats||{};state.loveActionCounts=state.loveActionCounts||{};
state.chatHistory=Array.isArray(state.chatHistory)?state.chatHistory:[];
state.playMode=state.playMode||'single';state.netRoom=state.netRoom||'';state.netRole=state.netRole||'';
state.petCareToday=state.petCareToday||{date:'',dudu:false,bubu:false};
state.needs=state.needs||{
  shawn:{mood:86,hunger:28,sleepiness:20,health:96,cleanliness:88},
  elyn:{mood:90,hunger:32,sleepiness:24,health:97,cleanliness:90},
  dudu:{mood:91,hunger:34,sleepiness:25,health:96},
  bubu:{mood:88,hunger:30,sleepiness:32,health:97}
};
['shawn','elyn','dudu','bubu'].forEach(id=>{
  const base=id==='shawn'?{mood:86,hunger:28,sleepiness:20,health:96,cleanliness:88}:id==='elyn'?{mood:90,hunger:32,sleepiness:24,health:97,cleanliness:90}:id==='dudu'?{mood:91,hunger:34,sleepiness:25,health:96}:{mood:88,hunger:30,sleepiness:32,health:97};
  state.needs[id]=Object.assign({},base,state.needs[id]||{});
});
state.needsUpdatedAt=Number.isFinite(state.needsUpdatedAt)?state.needsUpdatedAt:Date.now();
state.audio=Object.assign({enabled:true,bgm:true,sfx:true,bgmVolume:.20,sfxVolume:.45},state.audio||{});
state.cookingStats=state.cookingStats||{total:0,perfect:0,burnt:0,undercooked:0};
state.recipeHistory=Array.isArray(state.recipeHistory)?state.recipeHistory:[];
state.outfits=Object.assign({shawn:'s01',elyn:'e01'},state.outfits||{});
state.outfitFavorites=state.outfitFavorites||{shawn:[],elyn:[]};
state.fishInventory=state.fishInventory||{};
state.fishAlbum=Array.isArray(state.fishAlbum)?state.fishAlbum:[];
state.fishingStats=state.fishingStats||{casts:0,catches:0,escapes:0,bestKg:0};
state.premiumBait=Number.isFinite(state.premiumBait)?state.premiumBait:2;
state.customRecipeBook=Array.isArray(state.customRecipeBook)?state.customRecipeBook:[];
state.cars=state.cars||{
 black:{id:'black',name:'Black Lexus',plate:'W 8331 M',fuel:78,clean:72,condition:96,mileage:12831,last:'车库',model:'./assets/cars/black-lexus.jpg'},
 white:{id:'white',name:'White Lexus',plate:'SLWR 0309',fuel:86,clean:81,condition:97,mileage:7039,last:'车库',model:'./assets/cars/white-lexus.jpg'}
};
['black','white'].forEach(id=>{state.cars[id]=Object.assign({fuel:80,clean:80,condition:100,mileage:0,last:'车库',model:id==='black'?'./assets/cars/black-lexus.jpg':'./assets/cars/white-lexus.jpg'},state.cars[id]||{})});

const $=s=>document.querySelector(s), scene=$('#scene');
let moving={elyn:false,shawn:false}; let keys={}; let raf=0; let last=0;



function weekKey(d=new Date()){const x=new Date(d.getFullYear(),0,1),days=Math.floor((d-x)/86400000),wk=Math.ceil((days+x.getDay()+1)/7);return `${d.getFullYear()}-W${String(wk).padStart(2,'0')}`}
function loveInfo(){const v=state.love;if(v<100)return{level:1,name:'相识',next:100};if(v<250)return{level:2,name:'亲近',next:250};if(v<500)return{level:3,name:'甜蜜',next:500};if(v<800)return{level:4,name:'默契',next:800};return{level:5,name:'很爱很爱 ♡',next:1000}}
function addLove(amount,reason=''){if(!amount)return;const before=state.love;state.love=Math.max(0,Math.min(1000,state.love+amount));save();if(state.love>before)rewardPop(`❤️ Love +${state.love-before}${reason?' · '+reason:''}`);checkAchievements();renderTaskUI()}
function grantActionLove(event){const base=LOVE_EVENT_BASE[event]||0;if(!base)return;const key=dateKey()+':'+event,c=state.loveActionCounts[key]||0,gain=c===0?base:c===1?Math.ceil(base/2):0;state.loveActionCounts[key]=c+1;if(gain)addLove(gain,'一起的日常')}
function initExtendedTasks(){const today=dateKey(),wk=weekKey();if(state.weeklyKey!==wk){state.weeklyKey=wk;state.weeklyTasks=seededShuffle(WEEKLY_TASK_POOL,hashString('week-'+wk)).slice(0,4).map(t=>({id:t.id,progress:0,done:false}))}if(state.coupleDate!==today){state.coupleDate=today;state.coupleTasks=seededShuffle(COUPLE_TASK_POOL,hashString('couple-'+today)).slice(0,3).map(t=>({id:t.id,progress:0,done:false}))}}
function extendedTaskDef(id){return WEEKLY_TASK_POOL.find(x=>x.id===id)||COUPLE_TASK_POOL.find(x=>x.id===id)}
function checkAchievements(){ACHIEVEMENTS.forEach(a=>{if(state.achievementIds.includes(a.id))return;const v=a.condition==='love'?state.love:(state.eventStats[a.event]||0);if(v>=a.target){state.achievementIds.push(a.id);state.coins+=a.coins||0;state.xpTotal+=a.xp||0;rewardPop(`🏆 成就：${a.title} · +${a.coins||0}🪙 +${a.xp||0}XP`)}});save()}
function taskCardHtml(t,d){return `<div class="manual-task ${t.done?'done':''}"><div class="manual-task-check">${t.done?'✓':'○'}</div><div><b>${d.title}</b><p>${d.desc||d.hint||''}</p><div class="manual-progress"><i style="width:${Math.min(100,(t.progress||0)/d.target*100)}%"></i></div><small>${Math.min(t.progress||0,d.target)}/${d.target}</small></div><strong>+${d.coins||0}🪙 · +${d.xp||0}XP${d.love?` · +${d.love}❤️`:''}</strong></div>`}

function dateKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function hashString(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function seededShuffle(arr,seed){const a=[...arr];let x=seed||1;for(let i=a.length-1;i>0;i--){x=(Math.imul(x,1664525)+1013904223)>>>0;const j=x%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function taskDef(id,special=false){return (special?SPECIAL_TASK_POOL:DAILY_TASK_POOL).find(t=>t.id===id)}
function levelInfo(){const per=250;return {level:1+Math.floor(state.xpTotal/per),inLevel:state.xpTotal%per,need:per}}
function initTasks(){
 const today=dateKey();
 if(state.dailyDate!==today){
   const picks=seededShuffle(DAILY_TASK_POOL,hashString(today)).slice(0,5);
   state.dailyDate=today;
   state.dailyTasks=picks.map(t=>({id:t.id,progress:0,done:false}));
   state.petCareToday={date:today,dudu:false,bubu:false};
 }
 if(!state.activeSpecial){
   const remaining=SPECIAL_TASK_POOL.filter(t=>!state.completedSpecialIds.includes(t.id));
   if(remaining.length){
     const pick=seededShuffle(remaining,hashString('special-'+today+'-'+state.completedSpecialIds.length))[0];
     state.activeSpecial={id:pick.id,progress:0,done:false};
   }
 }
 initExtendedTasks();
 save();
 renderTaskUI();
}
function grantReward(def,isSpecial=false){
 const oldLevel=levelInfo().level;state.coins+=def.coins||0;state.xpTotal+=def.xp||0;if(def.love)state.love=Math.min(1000,state.love+def.love);
 const newLevel=levelInfo().level;rewardPop(`${isSpecial?'特殊任务完成！':'任务完成！'} +${def.coins||0} 🪙 · +${def.xp||0} XP${def.love?` · +${def.love} ❤️`:''}${newLevel>oldLevel?' · 升到 Lv.'+newLevel+'！':''}`);checkAchievements();
}
function rewardPop(text){
 const e=document.createElement('div');e.className='reward-pop';e.textContent=text;document.body.appendChild(e);
 setTimeout(()=>e.remove(),2200);
}
function recordEvent(event,amount=1,meta={}){
 initTasksIfNeededOnly();state.eventStats[event]=(state.eventStats[event]||0)+amount;let changed=false;
 state.dailyTasks.forEach(t=>{if(t.done)return;const d=taskDef(t.id);if(!d||d.event!==event)return;t.progress=Math.min(d.target,(t.progress||0)+amount);if(t.progress>=d.target){t.done=true;grantReward(d,false)}changed=true});
 state.weeklyTasks.forEach(t=>{if(t.done)return;const d=extendedTaskDef(t.id);if(!d||d.event!==event)return;t.progress=Math.min(d.target,(t.progress||0)+amount);if(t.progress>=d.target){t.done=true;grantReward(d,false)}changed=true});
 state.coupleTasks.forEach(t=>{if(t.done)return;const d=extendedTaskDef(t.id);if(!d||d.event!==event)return;t.progress=Math.min(d.target,(t.progress||0)+amount);if(t.progress>=d.target){t.done=true;grantReward(d,false)}changed=true});
 if(state.activeSpecial&&!state.activeSpecial.done){const d=taskDef(state.activeSpecial.id,true);if(d&&d.event===event){state.activeSpecial.progress=Math.min(d.target,(state.activeSpecial.progress||0)+amount);if(state.activeSpecial.progress>=d.target){state.activeSpecial.done=true;grantReward(d,true);if(!state.completedSpecialIds.includes(d.id))state.completedSpecialIds.push(d.id);const completedId=d.id;setTimeout(()=>{if(state.activeSpecial&&state.activeSpecial.id===completedId){state.activeSpecial=null;initTasksIfNeededOnly();renderTaskUI();renderMapHud();save()}},2300)}changed=true}}
 if(LOVE_EVENT_BASE[event])grantActionLove(event);checkAchievements();if(changed){save();renderTaskUI();renderMapHud()}
}
function initTasksIfNeededOnly(){
 const today=dateKey();
 if(state.dailyDate!==today){
   const picks=seededShuffle(DAILY_TASK_POOL,hashString(today)).slice(0,5);
   state.dailyDate=today;state.dailyTasks=picks.map(t=>({id:t.id,progress:0,done:false}));
   state.petCareToday={date:today,dudu:false,bubu:false};
 }
 if(!state.activeSpecial){
   const remaining=SPECIAL_TASK_POOL.filter(t=>!state.completedSpecialIds.includes(t.id));
   if(remaining.length){
     const pick=seededShuffle(remaining,hashString('special-'+today+'-'+state.completedSpecialIds.length))[0];
     state.activeSpecial={id:pick.id,progress:0,done:false};
   }
 } initExtendedTasks();
}
function taskRowsHtml(){
 return state.dailyTasks.map(t=>{const d=taskDef(t.id);if(!d)return'';return `<div class="task-row ${t.done?'done':''}" title="${d.hint||''}"><input type="checkbox" ${t.done?'checked':''} disabled><span>${d.title}</span><span class="task-reward">+${d.coins}🪙 +${d.xp}XP</span><div class="task-progress">${Math.min(t.progress||0,d.target)}/${d.target}${d.hint?' · '+d.hint:''}</div></div>`}).join('');
}
function specialHtml(){
 if(!state.activeSpecial)return `<div class="special-task"><b>✨ 特殊任务</b><div class="special-desc">目前所有特殊任务都完成了 ♡</div></div>`;
 const d=taskDef(state.activeSpecial.id,true);if(!d)return'';
 return `<div class="special-task"><b>✨ 特殊任务 · 一次性</b><div class="special-desc">${d.title}：${d.desc}</div><div class="special-reward">${state.activeSpecial.progress||0}/${d.target} · 奖励 +${d.coins}🪙 +${d.xp}XP · 完成后永不重复</div></div>`;
}
function renderTaskUI(){
 const info=levelInfo(),love=loveInfo(),p=$('#progressionText'),list=$('#dailyTaskList'),sp=$('#specialTaskWrap');
 if(p)p.innerHTML=`<b>Lv.${info.level}</b> · 🪙 ${state.coins} · ✨ ${info.inLevel}/${info.need}<br><span class="love-quick">❤️ ${state.love}/1000 · ${love.name}</span>`;
 if(list)list.innerHTML=taskRowsHtml();if(sp)sp.innerHTML=specialHtml()+`<button class="open-taskbook-inline" id="openTaskBookInline">📖 打开完整任务手册</button>`;$('#openTaskBookInline')?.addEventListener('click',()=>openTaskHandbook('daily'));
}
function renderMapHud(){
 const root=$('#mapHud');if(!root)return;const info=levelInfo();
 const mini=id=>{const n=state.needs[id],e=needState(id),name=id==='shawn'?'Shawn':id==='elyn'?'Elyn':id==='dudu'?'Dudu':'Bubu';return `<div class="map-player ${id==='dudu'||id==='bubu'?'map-pet':''}" data-pet="${id}"><img src="./assets/sprites/${id}-idle.png"><div><b>${name} ${e.emoji}</b><small>心情 ${Math.round(n.mood)} · 饥饿 ${Math.round(n.hunger)} · 困意 ${Math.round(n.sleepiness)}</small></div></div>`};
 root.innerHTML=`${mini('shawn')}${mini('elyn')}${mini('dudu')}${mini('bubu')}
   <div class="map-task-title"><b>今日任务 ♡</b><br><small>Lv.${info.level} · 🪙 ${state.coins} · ✨ ${info.inLevel}/${info.need}</small></div>
   <div class="task-list">${taskRowsHtml()}</div>${specialHtml()}`;
 root.querySelector('[data-pet="dudu"]')?.addEventListener('click',()=>petCare('dudu'));
 root.querySelector('[data-pet="bubu"]')?.addEventListener('click',()=>petCare('bubu'));
}
function petCare(which){
 const today=dateKey();if(state.petCareToday.date!==today)state.petCareToday={date:today,dudu:false,bubu:false};
 if(which==='dudu'){
   synthPetSound('dudu');petAction('dudu','eat',1700);
   adjustNeeds('dudu',{hunger:-38,mood:+10,health:+2});
   if(!state.petCareToday.dudu){state.petCareToday.dudu=true;recordEvent('feedDudu',1);toast('给 Dudu 喂食了 ♡')}else toast('Dudu 又开心地吃了一点 ♡');
 }else{
   synthPetSound('bubu');petAction('bubu','happy',1700);
   adjustNeeds('bubu',{mood:+14,health:+2,hunger:-5});
   if(!state.petCareToday.bubu){state.petCareToday.bubu=true;recordEvent('brushBubu',1);toast('帮 Bubu 梳毛了 ♡')}else toast('Bubu 呼噜呼噜 ♡');
 }
 if(state.petCareToday.dudu&&state.petCareToday.bubu)recordEvent('petCareCombo',1);
 save();renderTaskUI();renderMapHud();renderNeedsUI();
}


function clampNeed(v){return Math.max(0,Math.min(100,v))}
function needState(id){
 const n=state.needs[id];
 if(n.health<40)return {emoji:'🤒',label:'不舒服',className:'need-sick'};
 if(n.sleepiness>78)return {emoji:'😴',label:'很困',className:'need-sleepy'};
 if(n.hunger>78)return {emoji:id==='dudu'?'🦴':id==='bubu'?'🐟':'🍽️',label:'很饿',className:'need-hungry'};
 if(n.mood<35)return {emoji:'😢',label:'心情低落',className:''};
 if(n.mood>82)return {emoji:'😊',label:'开心',className:''};
 return {emoji:'🙂',label:'普通',className:''};
}
function needBar(label,value,invert=false){
 const display=Math.round(value),quality=invert?100-value:value;
 const cls=quality<35?'bad':quality<65?'warn':'good';
 return `<div class="need-line"><span>${label}</span><div class="need-track"><div class="need-fill ${cls}" style="width:${clampNeed(invert?100-value:value)}%"></div></div><span class="need-number">${display}</span></div>`;
}
function renderNeedsUI(){
 const root=$('#needsPanel');if(!root)return;
 root.innerHTML=['shawn','elyn','dudu','bubu'].map(id=>{
   const n=state.needs[id],e=needState(id),isPet=id==='dudu'||id==='bubu';
   const name=id==='shawn'?'Shawn':id==='elyn'?'Elyn':id==='dudu'?'Dudu':'Bubu';
   return `<div class="needs-card ${state.active===id?'active':''} ${isPet?'pet-card':''}" data-needs="${id}">
     <div class="needs-head">
       <img src="./assets/sprites/${id}-idle.png">
       <div class="needs-name"><b>${name}</b><small>${e.label}</small></div>
       <span class="needs-face">${e.emoji}</span>
     </div>
     <div class="needs-bars">
       ${needBar('心情',n.mood)}
       ${needBar('饥饿',n.hunger,true)}
       ${needBar('困意',n.sleepiness,true)}
       ${needBar('健康',n.health)}
       ${!isPet?needBar('清洁',n.cleanliness):''}
     </div>
   </div>`;
 }).join('');
 root.querySelector('[data-needs="dudu"]')?.addEventListener('click',()=>petCare('dudu'));
 root.querySelector('[data-needs="bubu"]')?.addEventListener('click',()=>petCare('bubu'));
 updateExpressionBubbles();
}
function updateExpressionBubbles(){
 ['shawn','elyn','dudu','bubu'].forEach(id=>{
   const e=needState(id),b=$('#'+id+'Emotion');if(b)b.textContent=e.emoji;
   const actor=$('#'+id);if(actor&&id!=='dudu'&&id!=='bubu'){
     actor.classList.remove('need-hungry','need-sleepy','need-sick');
     if(e.className)actor.classList.add(e.className);
   }
 });
}
function applyNeedsElapsed(){
 const now=Date.now(),mins=Math.min(240,Math.max(0,(now-state.needsUpdatedAt)/60000));
 if(mins<=0)return;
 ['shawn','elyn'].forEach(id=>{
   const n=state.needs[id];
   n.hunger=clampNeed(n.hunger+mins*1.15);
   n.sleepiness=clampNeed(n.sleepiness+mins*.72);
   n.cleanliness=clampNeed(n.cleanliness-mins*.35);
   if(n.hunger>82||n.sleepiness>88)n.mood=clampNeed(n.mood-mins*.45);
   if(n.hunger>94||n.sleepiness>96)n.health=clampNeed(n.health-mins*.22);
 });
 ['dudu','bubu'].forEach(id=>{
   const n=state.needs[id];
   n.hunger=clampNeed(n.hunger+mins*.95);
   n.sleepiness=clampNeed(n.sleepiness+mins*.60);
   if(n.hunger>85)n.mood=clampNeed(n.mood-mins*.38);
   if(n.hunger>96)n.health=clampNeed(n.health-mins*.18);
 });
 state.needsUpdatedAt=now;
}
function adjustNeeds(id,changes){
 const n=state.needs[id];if(!n)return;
 Object.entries(changes).forEach(([k,v])=>{if(k in n)n[k]=clampNeed(n[k]+v)});
 save();renderNeedsUI();renderMapHud();
}
function needComment(){
 const id=state.active,n=state.needs[id],name=activeName();
 if(n.health<40)return say(name,'今天有点不舒服，想休息一下…');
 if(n.hunger>82)return say(name,'肚子好饿…可以去厨房找东西吃吗？');
 if(n.sleepiness>82)return say(name,'好困哦…想去床上躺一下。');
 if(n.mood<35)return say(name,'今天心情有一点低落…陪陪我好吗？');
}
let audioCtx=null,bgmNodes=[],bgmTimer=null;
function ensureAudio(){
 if(!state.audio.enabled)return;
 if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
 if(audioCtx.state==='suspended')audioCtx.resume();
 if(state.audio.bgm)startBgm();
}
function stopBgm(){if(bgmTimer){clearInterval(bgmTimer);bgmTimer=null}bgmNodes.forEach(n=>{try{n.stop()}catch(e){}});bgmNodes=[]}
function playPad(freqs,dur=7){
 if(!audioCtx||!state.audio.bgm||!state.audio.enabled)return;
 const master=audioCtx.createGain();master.gain.setValueAtTime(0,audioCtx.currentTime);
 master.gain.linearRampToValueAtTime(state.audio.bgmVolume*.055,audioCtx.currentTime+1.1);
 master.gain.linearRampToValueAtTime(0,audioCtx.currentTime+dur);
 master.connect(audioCtx.destination);
 freqs.forEach((f,i)=>{const o=audioCtx.createOscillator();const g=audioCtx.createGain();o.type=i===0?'sine':'triangle';o.frequency.value=f;g.gain.value=i===0?.75:.38;o.connect(g);g.connect(master);o.start();o.stop(audioCtx.currentTime+dur+.1);bgmNodes.push(o)});
}
function startBgm(){
 if(bgmTimer||!state.audio.bgm||!state.audio.enabled)return;
 const chords=[[220,277.18,329.63],[196,246.94,293.66],[174.61,220,261.63],[196,246.94,329.63]];
 let i=0;playPad(chords[i++%chords.length]);
 bgmTimer=setInterval(()=>playPad(chords[i++%chords.length]),6800);
}
function toggleBgm(){
 state.audio.bgm=!state.audio.bgm;save();
 if(state.audio.bgm){ensureAudio();toast('背景音乐：开启 🎵')}else{stopBgm();toast('背景音乐：关闭')}
 updateMusicButton();
}
function updateMusicButton(){const b=$('#musicBtn');if(b)b.textContent=state.audio.bgm?'🎵':'🔇'}
function synthPetSound(type){
 if(!state.audio.enabled||!state.audio.sfx)return;ensureAudio();if(!audioCtx)return;
 const now=audioCtx.currentTime,g=audioCtx.createGain(),o=audioCtx.createOscillator();
 g.gain.setValueAtTime(state.audio.sfxVolume*.14,now);g.gain.exponentialRampToValueAtTime(.001,now+.28);g.connect(audioCtx.destination);
 if(type==='dudu'){o.type='square';o.frequency.setValueAtTime(240,now);o.frequency.exponentialRampToValueAtTime(125,now+.13)}
 else{o.type='sine';o.frequency.setValueAtTime(520,now);o.frequency.exponentialRampToValueAtTime(850,now+.12);o.frequency.exponentialRampToValueAtTime(430,now+.28)}
 o.connect(g);o.start(now);o.stop(now+.30);
}
function petAction(id,action,duration=1800){
 const img=$('#'+id)?.querySelector('img');if(!img)return;
 img.src=`./assets/sprites/${PET_SPRITES[id][action]||PET_SPRITES[id].idle}`;
 if(action==='walk'||action==='run')$('#'+id).classList.add('walking');else $('#'+id).classList.remove('walking');
 clearTimeout(img._reset);img._reset=setTimeout(()=>{img.src=`./assets/sprites/${PET_SPRITES[id].idle}`;$('#'+id).classList.remove('walking')},duration);
}
function petAiStep(id){
 if($('#gameScreen').classList.contains('hidden'))return;
 const n=state.needs[id],p=getPos(id),room=ROOMS[state.room];
 if(n.sleepiness>78){petAction(id,'sleep',4200);n.sleepiness=clampNeed(n.sleepiness-4);return}
 if(n.hunger>78){petAction(id,'lie',2800);return}
 const target=[Math.max(16,Math.min(86,p[0]+(Math.random()-.5)*30)),Math.max(48,Math.min(84,p[1]+(Math.random()-.5)*16))];
 petAction(id,Math.random()>.7?'run':'walk',2300);setPos(id,target);
 if(Math.random()<.12)synthPetSound(id);
}
function startPetAI(){
 clearInterval(window.__petAiTimer);
 window.__petAiTimer=setInterval(()=>{petAiStep('dudu');setTimeout(()=>petAiStep('bubu'),900)},5200);
}
function openSoundSettings(){
 modal('声音设置 🎵',`
  <p>背景音乐、宠物声音和互动音效都可以独立控制。</p>
  <div class="audio-chip"><b>背景音乐</b><input id="bgmToggle" type="checkbox" ${state.audio.bgm?'checked':''}><span class="sound-state">${state.audio.bgm?'开启':'关闭'}</span></div>
  <div class="audio-chip"><b>BGM 音量</b><input id="bgmVol" type="range" min="0" max="100" value="${Math.round(state.audio.bgmVolume*100)}"><span>${Math.round(state.audio.bgmVolume*100)}%</span></div>
  <div class="audio-chip"><b>音效</b><input id="sfxToggle" type="checkbox" ${state.audio.sfx?'checked':''}><span class="sound-state">${state.audio.sfx?'开启':'关闭'}</span></div>
  <div class="audio-chip"><b>音效音量</b><input id="sfxVol" type="range" min="0" max="100" value="${Math.round(state.audio.sfxVolume*100)}"><span>${Math.round(state.audio.sfxVolume*100)}%</span></div>
  <div class="audio-note">浏览器会在你第一次点击“继续游戏”后才允许播放声音。</div>`);
 const bg=$('#bgmToggle'),bv=$('#bgmVol'),sf=$('#sfxToggle'),sv=$('#sfxVol');
 bg.onchange=()=>{state.audio.bgm=bg.checked;save();if(bg.checked){ensureAudio()}else stopBgm();updateMusicButton();openSoundSettings()};
 bv.oninput=()=>{state.audio.bgmVolume=+bv.value/100;save();bv.nextElementSibling.textContent=bv.value+'%'};
 sf.onchange=()=>{state.audio.sfx=sf.checked;save();openSoundSettings()};
 sv.oninput=()=>{state.audio.sfxVolume=+sv.value/100;save();sv.nextElementSibling.textContent=sv.value+'%'};
}

function save(){localStorage.setItem('worldRebuild1',JSON.stringify(state))}
function showGame(){ $('#titleScreen').classList.add('hidden');$('#mapScreen').classList.add('hidden');$('#gameScreen').classList.remove('hidden');applyNeedsElapsed();renderNeedsUI();enterRoom(state.room||'living',false);renderOutfitSprites();renderCoopStatus();ensureAudio();startPetAI();updateMusicButton()}
function buildTabs(){const r=$('#roomTabs');r.innerHTML='';ROOM_ORDER.forEach(id=>{const b=document.createElement('button');b.textContent=ROOMS[id].label;b.onclick=()=>enterRoom(id);b.dataset.room=id;r.appendChild(b)})}
function enterRoom(id,doSave=true){state.room=id;if(doSave)netSend({type:'room',roomId:id});if(id==='lake')setTimeout(()=>recordEvent('visitLake',1),20); const room=ROOMS[id]; scene.style.backgroundImage=`url('./assets/scenes/${room.bg}')`; document.querySelectorAll('#roomTabs button').forEach(b=>b.classList.toggle('active',b.dataset.room===id)); const p=state.positions[id]||{}; setPos('elyn',p.elyn||room.spawn);setPos('shawn',p.shawn||room.partner);setPos('dudu',room.dudu);setPos('bubu',room.bubu); renderHotspots(); say(activeName(),`来到${room.label}啦 ♡`); renderNeedsUI();if(doSave)save()}
function setPos(id,p){const el=$('#'+id);el.style.left=p[0]+'%';el.style.top=p[1]+'%';if(id==='elyn'||id==='shawn'){state.positions[state.room]=state.positions[state.room]||{};state.positions[state.room][id]=[...p];}}
function getPos(id){const e=$('#'+id);return [parseFloat(e.style.left)||50,parseFloat(e.style.top)||75]}
function actorEl(){return $('#'+state.active)}
function activeName(){return state.active==='elyn'?'Elyn':'Shawn'}
function partnerName(){return state.active==='elyn'?'Shawn':'Elyn'}
function renderHotspots(){const root=$('#interactionLayer');root.innerHTML='';ROOMS[state.room].hotspots.forEach(h=>{const b=document.createElement('button');b.className='hotspot'+(h.objectHit?' object-hit':'');b.style.left=h.x+'%';b.style.top=h.y+'%';if(h.w)b.style.width=h.w+'%';if(h.h)b.style.height=h.h+'%';b.textContent=h.objectHit?'':h.label;b.setAttribute('aria-label',h.label);b.onclick=e=>{e.stopPropagation();interact(h.action)};root.appendChild(b)})}
function say(name,text){$('#dialogName').textContent=name;$('#dialogText').textContent=text}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),1700)}
function switchActor(){if(state.playMode==='localCoop'){toast('本机双人：Elyn=WASD · Shawn=方向键');return}if(state.playMode==='room'&&state.netRole){toast('同步房间中你控制 '+(state.netRole==='elyn'?'Elyn':'Shawn'));return}state.active=state.active==='elyn'?'shawn':'elyn';recordEvent('switchCharacter',1);document.querySelectorAll('.actor').forEach(e=>e.classList.toggle('active',e.id===state.active));document.querySelectorAll('.status-card').forEach((e,i)=>e.classList.toggle('active',(i===0&&state.active==='shawn')||(i===1&&state.active==='elyn')));say(activeName(),'换我来 ♡');renderNeedsUI();save()}
function moveTo(x,y){x=Math.max(14,Math.min(88,x));y=Math.max(32,Math.min(86,y));const id=state.active, el=$('#'+id), from=getPos(id);const dx=x-from[0],dy=y-from[1];let dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');el.querySelector('.base-sprite').src=humanSpriteSrc(id,dir);moving[id]=true; const d=$('#destination');d.style.left=x+'%';d.style.top=y+'%';d.style.opacity=1; const start=performance.now(),dur=Math.min(1300,Math.max(250,Math.hypot(dx,dy)*35)); function step(now){let t=Math.min(1,(now-start)/dur);let ease=1-Math.pow(1-t,3);setPos(id,[from[0]+dx*ease,from[1]+dy*ease]);if(t<1)requestAnimationFrame(step);else{moving[id]=false;el.querySelector('.base-sprite').src=humanSpriteSrc(id,'idle');d.style.opacity=0;save()}} requestAnimationFrame(step)}
scene.addEventListener('click',e=>{if(e.target.closest('.hotspot'))return;const r=scene.getBoundingClientRect();moveTo((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100)});
function moveKeyboardActor(id,dt,left,right,up,down){
 let p=getPos(id),speed=20*dt,dir=null;if(left){p[0]-=speed;dir='left'}if(right){p[0]+=speed;dir='right'}if(up){p[1]-=speed;dir='up'}if(down){p[1]+=speed;dir='down'}
 const img=$('#'+id)?.querySelector('.base-sprite');if(dir){p[0]=Math.max(14,Math.min(88,p[0]));p[1]=Math.max(32,Math.min(86,p[1]));setPos(id,p);if(img)img.src=humanSpriteSrc(id,dir);if(state.playMode==='room'&&state.netRole===id&&performance.now()-netLastMove>70){netLastMove=performance.now();netSend({type:'move',actor:id,pos:p,dir})}}else if(img)img.src=humanSpriteSrc(id,'idle')
}
function keyboardLoop(ts){if(!last)last=ts;const dt=Math.min(.04,(ts-last)/1000);last=ts;const typing=document.activeElement===$('#chatInput')||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);if(!typing){if(state.playMode==='localCoop'){moveKeyboardActor('elyn',dt,keys.a,keys.d,keys.w,keys.s);moveKeyboardActor('shawn',dt,keys.ArrowLeft,keys.ArrowRight,keys.ArrowUp,keys.ArrowDown)}else if(state.playMode==='room'){const id=state.netRole||state.active;moveKeyboardActor(id,dt,keys.ArrowLeft||keys.a,keys.ArrowRight||keys.d,keys.ArrowUp||keys.w,keys.ArrowDown||keys.s)}else moveKeyboardActor(state.active,dt,keys.ArrowLeft||keys.a,keys.ArrowRight||keys.d,keys.ArrowUp||keys.w,keys.ArrowDown||keys.s)}raf=requestAnimationFrame(keyboardLoop)}

window.addEventListener('keydown',e=>{if(e.key==='Enter'){if(document.activeElement===$('#chatInput')){e.preventDefault();sendTypedChat();return}if(!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){e.preventDefault();$('#chatInput')?.focus();return}}if(e.key==='Escape'&&document.activeElement===$('#chatInput')){$('#chatInput').blur();return}if(document.activeElement===$('#chatInput'))return;keys[e.key]=true;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault()});window.addEventListener('keyup',e=>{keys[e.key]=false;save()});
function openMap(){save();$('#gameScreen').classList.add('hidden');$('#mapScreen').classList.remove('hidden');renderMapHud()}
function buildMap(){const root=$('#mapPins');root.innerHTML='';ROOM_ORDER.forEach(id=>{const [x,y]=MAP_POS[id],b=document.createElement('button');b.style.left=x+'%';b.style.top=y+'%';b.setAttribute('aria-label','进入'+ROOMS[id].label);b.title='进入'+ROOMS[id].label;b.onclick=()=>{state.room=id;showGame()};root.appendChild(b)})}
function modal(title,html){$('#modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal"><button class="close">×</button><h2>${title}</h2>${html}</div></div>`;$('.modal .close').onclick=()=>$('#modalRoot').innerHTML='';$('.modal-backdrop').onclick=e=>{if(e.target.classList.contains('modal-backdrop'))$('#modalRoot').innerHTML=''}}
function interact(action){
 const name=activeName();
 if(action==='fridge'){return openFridgeLegacy();}
 if(action==='cook'){return openCookingLegacy();}
 if(action==='eat'){return openDiningLegacy();}
 if(action==='washDishes'){return openDishwashingLegacy();}
 if(false){modal('冰箱 · 食材搜索',`<p>冰箱已经开始支持大量食材的搜索结构。</p><input id="foodSearch" class="search" placeholder="搜索：鸡蛋、牛奶、草莓、鸡肉、芝士…"><div id="foodResult" class="result">输入食材名称试试看。</div>`);const list=['鸡蛋','牛奶','草莓','鸡肉','芝士','番茄','蘑菇','黄油','酸奶','果汁','生菜','胡萝卜','洋葱','辣椒','面包','培根','意大利面'];$('#foodSearch').oninput=e=>{let q=e.target.value.trim();$('#foodResult').textContent=q?((list.filter(x=>x.includes(q)).join(' · '))||'暂时没有找到，之后可加入购物清单。'):'输入食材名称试试看。'};return}
 if(action==='fish'){return openFishingGame();}
 if(action==='plant'||action==='vegetable'){let type=action==='plant'?'花':'蔬菜';modal(`种${type} 🌱`,`<p>种子库存：${state.seeds}</p><div class="grid"><button class="card" id="seed1">${type==='花'?'玫瑰':'番茄'}</button><button class="card" id="seed2">${type==='花'?'向日葵':'胡萝卜'}</button><button class="card" id="buySeed">购买种子 +3</button></div>`);['seed1','seed2'].forEach(id=>$('#'+id).onclick=()=>{if(state.seeds<=0){toast('没有种子了');return}state.seeds--;recordEvent('plant',1);save();toast('种下去了 ♡ 之后会有成长阶段')});$('#buySeed').onclick=()=>{state.seeds+=3;save();toast('买了 3 包种子')};return}
 if(action==='closet'){return openWardrobe();}
 if(action==='sleep'){say(name,'坐到床边 → 掀被子 → 躺下 → 晚安 ♡');adjustNeeds(state.active,{sleepiness:-72,mood:+12,health:+6});toast('睡了一觉 · 困意大幅恢复');return}
 if(action==='hug'){recordEvent('coupleHug',1);say(name,`走近 ${partnerName()} → 对齐 → 抱住 ♡`);toast('抱抱 ♡');return}
 if(action==='blackcar'){return openCarGarage('black');}
 if(action==='whitecar'){return openCarGarage('white');}
 if(action==='shower'||action==='groom')adjustNeeds(state.active,{cleanliness:+45,mood:+5,health:+2});if(action==='talk'||action==='sit'||action==='tv')adjustNeeds(state.active,{mood:+7});if(action==='talk')recordEvent('coupleTalk',1);const labels={sit:'坐下来休息 ♡',tv:'一起看电视',cook:'开始做饭',eat:'一起吃饭',shower:'去洗澡',groom:'洗漱',study:'一起学习',talk:'一起看风景',water:'给植物浇水'};if(action==='study')recordEvent('study',1);if(action==='water')recordEvent('waterPlants',1);
 say(name,labels[action]||'互动中 ♡');toast(labels[action]||'完成互动')}


function hasIngredients(required){return Object.entries(required).every(([id,n])=>(state.fridge[id]||0)>=n)}
function missingIngredients(required){return Object.entries(required).filter(([id,n])=>(state.fridge[id]||0)<n).map(([id,n])=>`${INGREDIENTS[id]?.label||id} ×${n-(state.fridge[id]||0)}`)}
function consumeIngredients(required){Object.entries(required).forEach(([id,n])=>state.fridge[id]=Math.max(0,(state.fridge[id]||0)-n))}
function recipeVisual(r,small=false){return `<div class="food-visual ${small?'small':''}"><span>${r.emoji||'🍽️'}</span>${r.img?`<img src="${r.img}" alt="">`:''}</div>`}
function ingredientVisual(id){
 const it=INGREDIENTS[id],art=INGREDIENT_ART[id];
 return art?`<img class="ingredient-photo" src="${art}" alt="${it?.label||id}">`:`<span class="ingredient-emoji">${it?.emoji||'🥣'}</span>`;
}
function closeKitchenOverlay(){document.querySelector('.kitchen-fp-overlay')?.remove()}
function kitchenOverlay(inner,cls=''){
 closeKitchenOverlay();
 const el=document.createElement('section');el.className='kitchen-fp-overlay '+cls;
 el.innerHTML=`<div class="kitchen-fp-bg"></div><div class="kitchen-fp-shade"></div>
   <button class="fp-close" id="fpClose">✕</button>${inner}`;
 document.body.appendChild(el);$('#fpClose').onclick=closeKitchenOverlay;ensureAudio();return el;
}
function playKitchenSfx(type){
 if(!state.audio?.enabled||!state.audio?.sfx)return;ensureAudio();if(!audioCtx)return;
 const now=audioCtx.currentTime,g=audioCtx.createGain(),o=audioCtx.createOscillator();g.connect(audioCtx.destination);o.connect(g);
 g.gain.setValueAtTime(state.audio.sfxVolume*.09,now);g.gain.exponentialRampToValueAtTime(.001,now+.18);
 if(type==='crack'){o.type='square';o.frequency.setValueAtTime(420,now);o.frequency.exponentialRampToValueAtTime(150,now+.12)}
 else if(type==='chop'){o.type='triangle';o.frequency.setValueAtTime(210,now);o.frequency.exponentialRampToValueAtTime(90,now+.08)}
 else if(type==='sizzle'){o.type='sawtooth';o.frequency.setValueAtTime(110,now);o.frequency.linearRampToValueAtTime(175,now+.16)}
 else if(type==='ding'){o.type='sine';o.frequency.setValueAtTime(740,now);o.frequency.linearRampToValueAtTime(980,now+.12)}
 else{o.type='sine';o.frequency.value=330}
 o.start(now);o.stop(now+.2);
}

function openFridgeLegacy(){
 recordEvent('openFridge',1);
 const layout={
  milk:[18,23],orangeJuice:[91,34],berryYogurt:[36,20],plainYogurt:[49,20],butter:[66,20],
  cheese:[75,38],eggs:[31,41],strawberries:[49,41],mushrooms:[64,42],tomatoes:[28,63],
  carrots:[48,64],onions:[67,64],sauces:[91,57],chicken:[49,81],lettuce:[26,82],
  cream:[77,80],bacon:[62,80],salmon:[76,61],kimchi:[16,62],lemon:[84,44],greenOnion:[57,61],avocado:[81,80]
 };
 const ids=REFRIGERATED_IDS.filter(id=>INGREDIENTS[id]);
 const visualIds=ids.filter(id=>INGREDIENT_ART[id]);
 const itemHtml=visualIds.map(id=>{
  const it=INGREDIENTS[id],p=state.fridgePositions[id]||layout[id]||DEFAULT_FRIDGE_POSITIONS[id]||[50,50];
  return `<button class="real-fridge-item" data-id="${id}" data-cat="${it.cat}" style="left:${p[0]}%;top:${p[1]}%" title="${it.label}">
    ${ingredientVisual(id)}<small>${state.fridge[id]||0}</small></button>`;
 }).join('');
 const pantryIds=Object.keys(INGREDIENTS).filter(id=>!REFRIGERATED_IDS.includes(id));
 kitchenOverlay(`
 <div class="real-fridge-shell">
  <header class="fp-top"><div><span class="fp-kicker">第一人称 · 冰箱</span><h1>真正打开冰箱</h1><p>像真实冰箱一样看架子里的食材。没有一堆白色卡片挡住画面。</p></div><div class="fp-mini-help">🔎 搜索 · 🖐️ 整理 · 🐟 鱼获</div></header>
  <div class="real-fridge-layout">
   <div class="real-fridge-stage">
    <div class="real-fridge-board" id="fridgeBoard">${itemHtml}</div>
   </div>
   <aside class="real-fridge-side">
    <input id="fridgeSearch2" class="fp-search" placeholder="搜索冰箱 / 储藏柜 / 鱼获…">
    <div class="fridge-tabs"><button class="active" data-fridge-tab="cold">冰箱</button><button data-fridge-tab="pantry">储藏柜</button><button data-fridge-tab="fish">鱼获</button></div>
    <div id="fridgeInfo" class="fridge-info"><b>点击食材</b><p>查看库存，或直接拖动改变摆放位置。</p></div>
    <div id="fridgeInventoryList" class="inventory-real-list"></div>
    <div class="fridge-actions"><button class="fp-action secondary" id="quickRestock">🛒 补货 · 80 coins</button><button class="fp-action" id="goCookFromFridge">🍳 去料理台</button></div>
   </aside>
  </div>
 </div>`,'fridge-mode real-fridge-mode');
 let tab='cold',drag=null,q='';
 const listRoot=$('#fridgeInventoryList');
 const renderSide=()=>{
  if(tab==='cold'){
   listRoot.innerHTML=ids.filter(id=>!q||INGREDIENTS[id].label.includes(q)).map(id=>`<button class="inventory-real-row" data-pick="${id}">${ingredientVisual(id)}<span><b>${INGREDIENTS[id].label}</b><small>${INGREDIENTS[id].cat}</small></span><em>×${state.fridge[id]||0}</em></button>`).join('');
  }else if(tab==='pantry'){
   listRoot.innerHTML=pantryIds.filter(id=>!q||INGREDIENTS[id].label.includes(q)).map(id=>`<button class="inventory-real-row" data-pick="${id}">${ingredientVisual(id)}<span><b>${INGREDIENTS[id].label}</b><small>储藏柜</small></span><em>×${state.fridge[id]||0}</em></button>`).join('');
  }else{
   const caught=FISH_DATA.filter(f=>(state.fishInventory[f.id]?.count||0)>0 && (!q||f.name.includes(q)));
   listRoot.innerHTML=caught.length?caught.map(f=>`<button class="inventory-real-row fish-row" data-fish="${f.id}"><img src="${f.img}"><span><b>${f.name}</b><small style="color:${FISH_RARITY_COLORS[f.rarity]}">${f.rarity} · 最重 ${state.fishInventory[f.id].best.toFixed(2)}kg</small></span><em>×${state.fishInventory[f.id].count}</em></button>`).join(''):'<div class="empty-note">还没有鱼获。去湖边钓鱼吧 🎣</div>';
  }
  listRoot.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>showIngredient(b.dataset.pick));
  listRoot.querySelectorAll('[data-fish]').forEach(b=>{b.onclick=()=>{const f=FISH_DATA.find(x=>x.id===b.dataset.fish);$('#fridgeInfo').innerHTML=`<div class="fish-info-mini"><img src="${f.img}"><div><b>${f.name}</b><p>${f.rarity} · 可拿来做自定义料理</p></div></div>`}});
 };
 const showIngredient=id=>{const it=INGREDIENTS[id];$('#fridgeInfo').innerHTML=`<div class="selected-big">${ingredientVisual(id)}<div><b>${it.label}</b><p>${it.cat} · 库存 ${state.fridge[id]||0}</p></div></div>`};
 $('#fridgeSearch2').oninput=e=>{q=e.target.value.trim();renderSide();document.querySelectorAll('.real-fridge-item').forEach(el=>el.style.opacity=(!q||INGREDIENTS[el.dataset.id].label.includes(q))?'1':'.18')};
 document.querySelectorAll('[data-fridge-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.fridgeTab;document.querySelectorAll('[data-fridge-tab]').forEach(x=>x.classList.toggle('active',x===b));renderSide()});
 document.querySelectorAll('.real-fridge-item').forEach(el=>{
  el.onclick=()=>showIngredient(el.dataset.id);
  el.onpointerdown=e=>{showIngredient(el.dataset.id);const r=$('#fridgeBoard').getBoundingClientRect();drag={el,r};el.setPointerCapture?.(e.pointerId);e.preventDefault()};
  el.onpointermove=e=>{if(!drag||drag.el!==el)return;const r=drag.r;let x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;x=Math.max(6,Math.min(94,x));y=Math.max(8,Math.min(92,y));el.style.left=x+'%';el.style.top=y+'%';state.fridgePositions[el.dataset.id]=[+x.toFixed(1),+y.toFixed(1)]};
  el.onpointerup=()=>{drag=null;save()};
 });
 $('#quickRestock').onclick=()=>{if(state.coins<80){toast('Coins 不够');return}state.coins-=80;Object.entries(DEFAULT_FRIDGE).forEach(([id,n])=>state.fridge[id]=Math.max(state.fridge[id]||0,Math.ceil(n*.7)));save();toast('补货完成 ♡');renderSide()};
 $('#goCookFromFridge').onclick=openCookingLegacy;renderSide();
}
function openCookingLegacy(){
 const cats=['全部',...new Set(Object.values(RECIPES).map(r=>r.cat))];
 kitchenOverlay(`
  <div class="recipe-fp-shell">
    <header class="fp-top"><div><span class="fp-kicker">COOKING MAMA MODE</span><h1>今天想煮什么？</h1><p>40 道食谱 · 每道料理有不同的第一人称小游戏。</p></div>
    <div class="chef-stats">🍳 ${state.cookingStats.total} 次料理 · ⭐ ${state.cookingStats.perfect} PERFECT</div></header>
    <div class="recipe-toolbar"><div class="recipe-toolbar-top"><input id="recipeSearch" class="fp-search" placeholder="搜索食谱…"><button class="mama-btn custom-cook-btn" id="customCookBtn">✨ 自定义煮菜</button></div><div class="fp-chips" id="recipeCats">${cats.map((c,i)=>`<button class="${i===0?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div></div>
    <div class="fp-recipe-grid" id="fpRecipeGrid"></div>
  </div>`, 'recipe-mode');
 let cat='全部';
 const render=()=>{
   const q=$('#recipeSearch').value.trim();
   $('#fpRecipeGrid').innerHTML=Object.entries(RECIPES).filter(([id,r])=>(cat==='全部'||r.cat===cat)&&(!q||r.label.toLowerCase().includes(q.toLowerCase()))).map(([id,r])=>{
     const miss=missingIngredients(r.ingredients),ok=!miss.length;
     return `<button class="fp-recipe-card ${ok?'':'locked'}" data-recipe="${id}">
       ${recipeVisual(r)}<div class="recipe-copy"><span>${r.cat} · ${r.difficulty}</span><b>${r.emoji} ${r.label}</b>
       <small>${r.steps.map(x=>STEP_LABELS[x]||x).slice(0,4).join(' → ')}${r.steps.length>4?'…':''}</small>
       <em>${ok?'食材齐全 · 开始料理':'缺：'+miss.slice(0,3).join('、')}</em></div></button>`;
   }).join('');
   document.querySelectorAll('[data-recipe]').forEach(b=>b.onclick=()=>{
     const id=b.dataset.recipe,r=RECIPES[id];const miss=missingIngredients(r.ingredients);
     if(miss.length){toast('缺少食材：'+miss.join('、'));return}startCookingLegacy(id);
   });
 };
 $('#customCookBtn').onclick=openCustomCooking;$('#recipeSearch').oninput=render;document.querySelectorAll('#recipeCats button').forEach(b=>b.onclick=()=>{cat=b.dataset.cat;document.querySelectorAll('#recipeCats button').forEach(x=>x.classList.toggle('active',x===b));render()});render();
}

function customIngredientPool(){
 const pool=[];
 Object.keys(INGREDIENTS).forEach(id=>{if((state.fridge[id]||0)>0)pool.push({key:'ing:'+id,label:INGREDIENTS[id].label,type:'ing',id,visual:ingredientVisual(id),count:state.fridge[id]||0})});
 FISH_DATA.forEach(f=>{const inv=state.fishInventory[f.id];if(inv?.count>0)pool.push({key:'fish:'+f.id,label:f.name,type:'fish',id:f.id,visual:`<img class="ingredient-photo fish-ingredient" src="${f.img}">`,count:inv.count,rarity:f.rarity})});
 return pool;
}
function openCustomCooking(){
 let selected=[],method='pan';
 const methods={
  pan:{name:'平底锅香煎',steps:['chop','season','heat','flip','plate'],icon:'🍳'},
  stir:{name:'大火快炒',steps:['chop','heat','flip','season','plate'],icon:'🔥'},
  boil:{name:'水煮 / 汤',steps:['chop','boil','stir','season','pour'],icon:'🥣'},
  oven:{name:'烤箱料理',steps:['chop','season','oven','plate'],icon:'🔥'},
  air:{name:'空气炸锅',steps:['chop','season','airfry','shake','plate'],icon:'🍟'},
  cold:{name:'冷盘 / 沙拉',steps:['chop','assemble','season','plate'],icon:'🥗'}
 };
 kitchenOverlay(`<div class="custom-cook-shell">
  <header class="fp-top"><div><span class="fp-kicker">自由料理实验室</span><h1>自定义煮菜</h1><p>自己选食材 + 烹饪方式。组合、熟度和操作技术一起决定味道。</p></div><div class="fp-mini-help">最多 6 种食材</div></header>
  <div class="custom-cook-layout">
   <section class="custom-pantry"><input class="fp-search" id="customSearch" placeholder="搜索食材 / 鱼获…"><div id="customIngredientGrid" class="custom-ingredient-grid"></div></section>
   <aside class="custom-plan"><h3>我的料理</h3><div id="customSelected" class="custom-selected"></div><h4>选择做法</h4><div class="custom-methods">${Object.entries(methods).map(([id,m])=>`<button data-method="${id}" class="${id===method?'active':''}">${m.icon}<b>${m.name}</b></button>`).join('')}</div><div id="customPrediction" class="custom-prediction"></div><button class="mama-btn" id="startCustomCook">开始自定义料理</button></aside>
  </div></div>`,'custom-cook-mode');
 let q='';
 const pool=()=>customIngredientPool().filter(x=>!q||x.label.includes(q));
 const render=()=>{
  $('#customIngredientGrid').innerHTML=pool().map(x=>`<button class="custom-ing-card ${selected.includes(x.key)?'selected':''}" data-custom="${x.key}">${x.visual}<b>${x.label}</b><span>×${x.count}${x.rarity?' · '+x.rarity:''}</span></button>`).join('');
  document.querySelectorAll('[data-custom]').forEach(b=>b.onclick=()=>{const k=b.dataset.custom;if(selected.includes(k))selected=selected.filter(x=>x!==k);else if(selected.length<6)selected.push(k);else toast('最多选择 6 种食材');renderPlan();render()});
 };
 const compatibility=()=>{
  if(selected.length<2)return 35;
  let score=55+selected.length*3;
  const labels=selected.map(k=>k.startsWith('ing:')?INGREDIENTS[k.slice(4)].label:FISH_DATA.find(f=>f.id===k.slice(5)).name);
  const hasFish=selected.some(k=>k.startsWith('fish:')||k==='ing:salmon'),hasDairy=selected.some(k=>['ing:milk','ing:cream','ing:cheese'].includes(k)),hasVeg=selected.some(k=>['ing:mushrooms','ing:tomatoes','ing:carrots','ing:onions','ing:lettuce','ing:greenOnion','ing:lemon'].includes(k)),hasSeason=selected.some(k=>['ing:sauces','ing:oil','ing:butter'].includes(k));
  if(hasFish&&hasVeg)score+=10;if(hasFish&&selected.includes('ing:lemon'))score+=9;if(hasSeason)score+=8;if(hasDairy&&method==='stir')score-=8;if(hasFish&&method==='cold')score+=5;
  if(selected.includes('ing:strawberries')&&(method==='pan'||method==='stir'))score-=12;
  return Math.max(20,Math.min(100,score));
 };
 const renderPlan=()=>{
  const names=selected.map(k=>k.startsWith('ing:')?INGREDIENTS[k.slice(4)].label:FISH_DATA.find(f=>f.id===k.slice(5)).name);
  $('#customSelected').innerHTML=names.length?names.map(n=>`<span>${n}</span>`).join(''):'<em>还没有选择食材</em>';
  const c=compatibility();$('#customPrediction').innerHTML=`组合契合度 <b>${c}</b>/100<br><small>${c>=80?'这个组合很有潜力 ♡':c>=60?'应该可以做出不错的料理':'这是实验型组合，可能会翻车…'}</small>`;
 };
 $('#customSearch').oninput=e=>{q=e.target.value.trim();render()};
 document.querySelectorAll('[data-method]').forEach(b=>b.onclick=()=>{method=b.dataset.method;document.querySelectorAll('[data-method]').forEach(x=>x.classList.toggle('active',x===b));renderPlan()});
 $('#startCustomCook').onclick=()=>{
  if(selected.length<2){toast('至少选择 2 种食材');return}
  // consume selected ingredients/fish
  selected.forEach(k=>{if(k.startsWith('ing:')){const id=k.slice(4);state.fridge[id]=Math.max(0,(state.fridge[id]||0)-1)}else{const id=k.slice(5);state.fishInventory[id].count--;if(state.fishInventory[id].count<=0)delete state.fishInventory[id]}});
  const labels=selected.map(k=>k.startsWith('ing:')?INGREDIENTS[k.slice(4)].label:FISH_DATA.find(f=>f.id===k.slice(5)).name);
  const main=labels[0],second=labels[1]||'时蔬',m=methods[method];
  const dishName=`${m.name.replace('料理','')} · ${main}${selected.length>1?'配'+second:''}`;
  RECIPES.__custom={label:dishName,cat:'自定义',emoji:m.icon,img:null,difficulty:'自由',ingredients:{},steps:m.steps,customBonus:compatibility(),customIngredients:[...selected]};
  state.customRecipeBook.unshift({name:dishName,method,ingredients:[...selected],compatibility:compatibility(),created:Date.now()});state.customRecipeBook=state.customRecipeBook.slice(0,30);save();startCookingLegacy('__custom');
 };
 render();renderPlan();
}
function startCookingLegacy(recipeId){
 const recipe=RECIPES[recipeId];consumeIngredients(recipe.ingredients);save();
 const session={recipeId,stepIndex:0,results:[],started:Date.now()};
 const intro=kitchenOverlay(`<div class="cook-countdown"><span>${recipe.emoji}</span><h1>${recipe.label}</h1><p>准备好了吗？每一步都会影响味道和熟度。</p><div class="count-num" id="countNum">3</div></div>`,'cooking-mode');
 let n=3;const t=setInterval(()=>{n--;if(n<=0){clearInterval(t);runCookingSession(session)}else $('#countNum').textContent=n},550);
}

function runCookingSession(session){
 const recipe=RECIPES[session.recipeId];
 if(session.stepIndex>=recipe.steps.length){finishCookingLegacy(session.recipeId,session.results);return}
 const step=recipe.steps[session.stepIndex];
 kitchenOverlay(`
  <div class="cook-fp-shell">
   <header class="cook-fp-header">
    <div class="cook-recipe-mini">${recipeVisual(recipe,true)}<div><span>${recipe.cat}</span><b>${recipe.label}</b></div></div>
    <div class="cook-progress">${recipe.steps.map((s,i)=>`<i class="${i<session.stepIndex?'done':i===session.stepIndex?'active':''}">${i+1}</i>`).join('')}<strong>${STEP_LABELS[step]||step}</strong></div>
    <div class="cook-score-mini">目前 ${session.results.length?Math.round(session.results.reduce((a,b)=>a+b.score,0)/session.results.length):'--'} 分</div>
   </header>
   <main class="fp-counter"><div class="fp-hands left-hand">🤲</div><div class="fp-workspace" id="fpWorkspace"></div><div class="fp-hands right-hand">🖐️</div></main>
  </div>`, 'cooking-mode');
 runCookStep2(step,session.recipeId,result=>{
   session.results.push(typeof result==='number'?{score:result}:result);
   session.stepIndex++;playKitchenSfx(result?.score>78?'ding':'tap');
   setTimeout(()=>runCookingSession(session),420);
 });
}

function runCookStep2(step,recipeId,done){
 const root=$('#fpWorkspace'),recipe=RECIPES[recipeId];
 const finish=(score,issue=null,note='')=>done({score:Math.round(Math.max(0,Math.min(100,score))),issue,note});
 if(step==='crack'){
   root.innerHTML=`<div class="egg-game"><h2>🥚 敲鸡蛋</h2><p>按住鸡蛋蓄力，觉得力度刚好时松开。</p><div class="egg-stage"><div class="egg-shell" id="eggShell">🥚</div><div class="force-meter"><i id="forceFill"></i><span class="force-good"></span></div><b id="forceText">力度 0%</b></div><button class="mama-btn hold" id="eggHold">按住 · 敲蛋</button><p class="game-hint" id="eggHint">太轻敲不开，太重会把蛋壳敲碎。</p></div>`;
   let force=0,holding=false,raf2,attempt=0;
   const loop=()=>{if(!holding)return;force=Math.min(100,force+1.35);$('#forceFill').style.width=force+'%';$('#forceText').textContent='力度 '+Math.round(force)+'%';if(force<100)raf2=requestAnimationFrame(loop)};
   const release=()=>{if(!holding)return;holding=false;cancelAnimationFrame(raf2);attempt++;playKitchenSfx('crack');
     if(force<24&&attempt<3){$('#eggHint').textContent='太轻了！蛋壳还没裂，再试一次。';force=0;$('#forceFill').style.width='0%';return}
     const score=100-Math.abs(force-56)*1.75;$('#eggShell').textContent=force>84?'💥':force<24?'🥚':'🍳';
     $('#eggHint').textContent=force>84?'糟糕，蛋壳碎得太厉害！':force<24?'几乎没有敲开。':force>=43&&force<=68?'漂亮！裂口刚刚好 ♡':'成功敲开，但力度还可以更准。';
     setTimeout(()=>finish(score,null,`敲蛋力度 ${Math.round(force)}%`),650)};
   const b=$('#eggHold');b.onpointerdown=e=>{holding=true;force=0;b.setPointerCapture?.(e.pointerId);loop()};b.onpointerup=release;b.onpointercancel=release;return;
 }
 if(step==='chop'){
   root.innerHTML=`<div class="chop-game"><h2>🔪 切菜</h2><p>在砧板上快速<strong>向下滑</strong> 6 次。越直、越利落越好。</p><div class="chop-board" id="chopBoard"><div class="veg-pile">🥕 🧅 🍅 🥬</div><div class="knife-guide">↓ ↓ ↓ ↓ ↓ ↓</div></div><div class="gesture-progress"><i id="chopProg"></i></div><b id="chopText">0 / 6</b></div>`;
   let start=null,count=0,total=0;const board=$('#chopBoard');
   board.onpointerdown=e=>{start=[e.clientX,e.clientY,performance.now()];board.setPointerCapture?.(e.pointerId)};
   board.onpointerup=e=>{if(!start)return;const dx=e.clientX-start[0],dy=e.clientY-start[1],dt=performance.now()-start[2];start=null;if(dy<45){$('#chopText').textContent='要向下滑哦';return}playKitchenSfx('chop');const straight=Math.max(0,100-Math.abs(dx)*1.5),speed=Math.max(35,100-Math.max(0,dt-180)*.18);total+=(straight*.7+speed*.3);count++;$('#chopProg').style.width=count/6*100+'%';$('#chopText').textContent=count+' / 6';if(count>=6)setTimeout(()=>finish(total/6),300)};return;
 }
 if(step==='whisk'||step==='stir'||step==='blend'){
   const target=step==='blend'?950:step==='whisk'?780:700;
   root.innerHTML=`<div class="stir-game"><h2>${step==='blend'?'🥤 搅拌机':step==='whisk'?'🥣 打蛋':'🥄 搅拌'}</h2><p>${step==='blend'?'按住并左右移动，让材料完全混合。':'用鼠标 / 手指在碗里连续画圈。'}</p><div class="mama-bowl" id="mamaBowl"><span>${step==='blend'?'🍓🥛':'🥣'}</span><i id="whiskTool">🥄</i></div><div class="gesture-progress"><i id="stirProg"></i></div><b id="stirText">0%</b></div>`;
   let last=null,dist=0,t0=0;const bowl=$('#mamaBowl');
   bowl.onpointerdown=e=>{bowl.setPointerCapture?.(e.pointerId);last=[e.clientX,e.clientY];t0=performance.now()};
   bowl.onpointermove=e=>{if(!last)return;const dx=e.clientX-last[0],dy=e.clientY-last[1];dist+=Math.hypot(dx,dy);last=[e.clientX,e.clientY];const r=bowl.getBoundingClientRect();$('#whiskTool').style.left=(e.clientX-r.left)+'px';$('#whiskTool').style.top=(e.clientY-r.top)+'px';let pct=Math.min(100,dist/target*100);$('#stirProg').style.width=pct+'%';$('#stirText').textContent=Math.round(pct)+'%';if(pct>=100){last=null;const sec=(performance.now()-t0)/1000;finish(Math.max(65,100-Math.abs(sec-3.2)*8))}};return;
 }
 if(step==='heat'||step==='boil'||step==='oven'){
   const isOven=step==='oven',isBoil=step==='boil';
   root.innerHTML=`<div class="heat-game"><h2>${isOven?'🔥 烤箱':isBoil?'♨️ 煮沸':'🍳 控制火候'}</h2><p>${isOven?'调温度并观察熟度，别烤焦。':isBoil?'控制火力，面条煮到刚刚好就捞起。':'可以随时调火；觉得熟度刚好时按“起锅”。'}</p>
    <div class="pan-stage ${isOven?'oven':''}"><div class="food-doneness" id="foodDone">${recipe.emoji}</div><div class="steam-lines"></div><div class="flame" id="flame">🔥</div></div>
    <div class="doneness-track"><span>生 / 没熟</span><div><i id="doneFill"></i><em class="done-sweet"></em></div><span>烧焦</span></div>
    <label class="range-row">${isOven?'温度':'火力'} <input id="heatPower" type="range" min="1" max="10" value="${isOven?6:5}"><b id="powerVal">${isOven?'180°C':'5'}</b></label>
    <button class="mama-btn" id="takeOff">${isOven?'出炉！':isBoil?'捞起来！':'起锅！'}</button><b id="heatStatus">正在加热…</b></div>`;
   let cooked=0,lastT=performance.now(),alive=true;const power=$('#heatPower');
   power.oninput=()=>{$('#powerVal').textContent=isOven?(120+(+power.value)*10)+'°C':power.value};
   const tick=now=>{if(!alive)return;const dt=(now-lastT)/1000;lastT=now;cooked+=dt*(2.2+(+power.value)*1.15);$('#doneFill').style.width=Math.min(100,cooked)+'%';const f=$('#foodDone');f.style.filter=`sepia(${Math.max(0,(cooked-55)/60)}) saturate(${1+Math.min(.8,cooked/120)}) brightness(${cooked>94?.68:1})`;$('#heatStatus').textContent=cooked<38?'里面还是生的…':cooked<62?'开始熟了':cooked<84?'看起来很香！':cooked<96?'快焦了！':'已经烧焦！';if(cooked>108){alive=false;finish(5,'burnt','烧焦')}else requestAnimationFrame(tick)};requestAnimationFrame(tick);playKitchenSfx('sizzle');
   $('#takeOff').onclick=()=>{alive=false;let issue=null;if(cooked<48)issue='raw';if(cooked>94)issue='burnt';const score=100-Math.abs(cooked-74)*2.25;finish(score,issue,`熟度 ${Math.round(cooked)}%`)};return;
 }
 if(step==='flip'){
   root.innerHTML=`<div class="flip-game"><h2>🍳 翻锅！</h2><p>指针进入绿色区域时按下。</p><div class="flip-track"><span class="flip-zone"></span><i id="flipMarker"></i></div><button class="mama-btn" id="flipBtn">现在翻！</button><div class="pan-flip" id="panFlip">${recipe.emoji}</div></div>`;
   let x=0,dir=1,alive=true;const loop=()=>{if(!alive)return;x+=dir*1.65;if(x>98||x<0)dir*=-1;$('#flipMarker').style.left=x+'%';requestAnimationFrame(loop)};loop();$('#flipBtn').onclick=()=>{alive=false;$('#panFlip').classList.add('flipped');playKitchenSfx('sizzle');finish(100-Math.abs(x-52)*2.1)};return;
 }
 if(step==='season'||step==='coat'){
   root.innerHTML=`<div class="season-game"><h2>${step==='coat'?'🥣 裹粉':'🧂 调味'}</h2><p>按住倒入，绿色范围最刚好。</p><div class="season-jar">🧂</div><div class="season2-track"><i id="seasonFill"></i><span></span></div><button class="mama-btn hold" id="seasonHold">按住加入</button><b id="seasonText">0%</b></div>`;
   let v=0,hold=false,rr;const loop=()=>{if(!hold)return;v=Math.min(100,v+.9);$('#seasonFill').style.width=v+'%';$('#seasonText').textContent=Math.round(v)+'%';rr=requestAnimationFrame(loop)};const b=$('#seasonHold');b.onpointerdown=e=>{hold=true;b.setPointerCapture?.(e.pointerId);loop()};b.onpointerup=()=>{hold=false;cancelAnimationFrame(rr);finish(100-Math.abs(v-52)*2,v>82?'tooMuch':null)};return;
 }
 if(step==='pour'){
   root.innerHTML=`<div class="pour-game"><h2>🫗 倒入</h2><p>按住倒入，停在目标容量。</p><div class="pour-scene"><div class="pitcher">🥛</div><div class="cup-fill"><i id="liquid"></i><em></em></div></div><button class="mama-btn hold" id="pourHold">按住倒</button><b id="pourText">0%</b></div>`;
   let v=0,hold=false,rr;const loop=()=>{if(!hold)return;v=Math.min(100,v+.85);$('#liquid').style.height=v+'%';$('#pourText').textContent=Math.round(v)+'%';rr=requestAnimationFrame(loop)};const b=$('#pourHold');b.onpointerdown=e=>{hold=true;b.setPointerCapture?.(e.pointerId);loop()};b.onpointerup=()=>{hold=false;cancelAnimationFrame(rr);finish(100-Math.abs(v-72)*2.4)};return;
 }
 if(step==='airfry'){
   root.innerHTML=`<div class="air-game"><h2>🍟 空气炸锅</h2><p>让进度到绿色区，再按完成。中途 45–65% 记得 Shake 一次。</p><div class="airfryer-box">AIR FRYER<div class="air-progress"><i id="airFill"></i><em></em></div><b id="airPct">0%</b></div><button class="mama-btn secondary" id="shakeBtn">SHAKE!</button><button class="mama-btn" id="airDone">完成</button><b id="shakeState">还没有 Shake</b></div>`;
   let p=0,shaken=false,lastT=performance.now(),alive=true;const tick=now=>{if(!alive)return;p+=(now-lastT)/1000*7.5;lastT=now;$('#airFill').style.width=Math.min(100,p)+'%';$('#airPct').textContent=Math.round(p)+'%';if(p>108){alive=false;finish(5,'burnt')}else requestAnimationFrame(tick)};requestAnimationFrame(tick);
   $('#shakeBtn').onclick=()=>{shaken=true;$('#shakeState').textContent=p>=42&&p<=68?'Shake 时机 PERFECT!':'Shake 了，但时机一般';playKitchenSfx('chop')};
   $('#airDone').onclick=()=>{alive=false;let issue=p<62?'raw':p>96?'burnt':null;let score=100-Math.abs(p-80)*2-(shaken?0:28);finish(score,issue)};return;
 }
 if(step==='shake'){
   root.innerHTML=`<div class="shake-game"><h2>🫳 Shake!</h2><p>在区域里快速左右来回滑动 8 次。</p><div class="shake-zone" id="shakeZone">🍗 🍟 🍗</div><div class="gesture-progress"><i id="shakeProg"></i></div><b id="shakeTxt">0 / 8</b></div>`;
   let lastX=null,turns=0,lastDir=0,t0=performance.now();const z=$('#shakeZone');z.onpointerdown=e=>{z.setPointerCapture?.(e.pointerId);lastX=e.clientX};z.onpointermove=e=>{if(lastX==null)return;const dx=e.clientX-lastX;if(Math.abs(dx)>24){const d=Math.sign(dx);if(lastDir&&d!==lastDir){turns++;$('#shakeProg').style.width=Math.min(100,turns/8*100)+'%';$('#shakeTxt').textContent=turns+' / 8';if(turns>=8){lastX=null;finish(Math.max(70,100-(performance.now()-t0-2200)/80))}}lastDir=d;lastX=e.clientX}};return;
 }
 if(step==='knead'||step==='decorate'||step==='assemble'||step==='dip'||step==='grind'||step==='brew'||step==='steam'){
   const map={
    knead:['🤲','揉面 / 塑形','快速点击 12 次，把形状做均匀。'],
    decorate:['🎂','装饰','把 6 个装饰点放上去。'],
    assemble:['🥪','组合料理','按正确顺序组装 5 层。'],
    dip:['🍞','浸泡吐司','点击 6 次让吐司两面均匀吸收蛋液。'],
    grind:['☕','磨咖啡豆','连续转动 / 点击把咖啡磨好。'],
    brew:['🫖','冲煮','保持稳定水流，完成 8 次。'],
    steam:['🥛','打奶泡','连续操作，别让奶泡过头。']
   };const [emo,title,desc]=map[step];const target=step==='knead'?12:step==='decorate'?6:step==='assemble'?5:step==='dip'?6:8;
   root.innerHTML=`<div class="tap-game"><h2>${emo} ${title}</h2><p>${desc}</p><button class="tap-object" id="tapObj">${emo}</button><div class="gesture-progress"><i id="tapProg"></i></div><b id="tapTxt">0 / ${target}</b></div>`;
   let n=0,t0=performance.now();$('#tapObj').onclick=()=>{n++;$('#tapObj').classList.toggle('pop');$('#tapProg').style.width=n/target*100+'%';$('#tapTxt').textContent=n+' / '+target;playKitchenSfx('chop');if(n>=target)finish(Math.max(68,100-(performance.now()-t0-target*180)/80))};return;
 }
 // plating
 root.innerHTML=`<div class="plate2-game"><h2>🍽️ 摆盘</h2><p>把料理拖到盘子中央。</p><div class="plate2-zone" id="plateZone"><div class="plate2"></div><div class="plate-food" id="plateFood">${recipe.emoji}</div></div></div>`;
 const zone=$('#plateZone'),food=$('#plateFood');let d=false;food.onpointerdown=e=>{d=true;food.setPointerCapture?.(e.pointerId)};food.onpointermove=e=>{if(!d)return;const r=zone.getBoundingClientRect();food.style.left=Math.max(5,Math.min(r.width-80,e.clientX-r.left-40))+'px';food.style.top=Math.max(5,Math.min(r.height-80,e.clientY-r.top-40))+'px'};food.onpointerup=()=>{d=false;const zr=zone.getBoundingClientRect(),fr=food.getBoundingClientRect(),dist=Math.hypot(fr.left+fr.width/2-(zr.left+zr.width/2),fr.top+fr.height/2-(zr.top+zr.height/2));finish(Math.max(40,100-dist/2.3))}
}

function finishCookingLegacy(recipeId,results){
 const recipe=RECIPES[recipeId];let avg=Math.round(results.reduce((a,b)=>a+b.score,0)/Math.max(1,results.length));if(recipe.customBonus!=null)avg=Math.round(avg*.78+recipe.customBonus*.22);
 const issues=results.map(x=>x.issue).filter(Boolean);
 let quality,cn;
 if(issues.includes('burnt')){quality='BURNT';cn='烧焦了'}
 else if(issues.includes('raw')){quality='UNDERCOOKED';cn='没熟'}
 else if(avg<45){quality='NOT TASTY';cn='不好吃'}
 else if(avg<62){quality='NORMAL';cn='普通'}
 else if(avg<78){quality='TASTY';cn='好吃'}
 else if(avg<92){quality='DELICIOUS';cn='很好吃'}
 else{quality='PERFECT';cn='PERFECT'}
 state.preparedMeals.push({id:String(Date.now()),recipeId,label:recipe.label,img:recipe.img,emoji:recipe.emoji,quality,qualityCn:cn,score:avg,servings:2});
 state.cookingStats.total++;if(quality==='PERFECT')state.cookingStats.perfect++;if(quality==='BURNT')state.cookingStats.burnt++;if(quality==='UNDERCOOKED')state.cookingStats.undercooked++;
 state.recipeHistory.unshift({recipeId,quality,score:avg,time:Date.now()});state.recipeHistory=state.recipeHistory.slice(0,30);
 recordEvent('cookMeal',1);if(quality==='PERFECT')recordEvent('perfectCook',1);save();
 kitchenOverlay(`<div class="cook-result ${quality.toLowerCase().replace(' ','-')}">
   <div class="result-stars">${avg>=90?'★★★★★':avg>=75?'★★★★☆':avg>=60?'★★★☆☆':avg>=45?'★★☆☆☆':'★☆☆☆☆'}</div>
   ${recipeVisual(recipe)}<span class="result-label">${cn}</span><h1>${recipe.label}</h1><div class="result-score">${avg}<small>/100</small></div>
   <div class="result-breakdown">${results.map((r,i)=>`<span>${STEP_LABELS[recipe.steps[i]]||recipe.steps[i]} <b>${r.score}</b>${r.issue==='burnt'?' 🔥':r.issue==='raw'?' 🧊':''}</span>`).join('')}</div>
   <div class="result-actions"><button class="mama-btn secondary" id="cookAgain">再做一次</button><button class="mama-btn" id="serveNow">去餐桌吃</button></div>
 </div>`,'result-mode');
 $('#cookAgain').onclick=()=>{if(recipeId==='__custom'){openCustomCooking();return}if(hasIngredients(recipe.ingredients))startCookingLegacy(recipeId);else{toast('食材不够，先去冰箱');setTimeout(openFridgeLegacy,450)}};
 $('#serveNow').onclick=openDiningLegacy;
}

function openDiningLegacy(){
 if(!state.preparedMeals.length){modal('餐桌',`<p>还没有准备好的料理。</p><button class="small-button" id="goCook">去做饭</button>`);$('#goCook').onclick=()=>{$('#modalRoot').innerHTML='';openCookingLegacy()};return}
 const cards=state.preparedMeals.map(m=>`<div class="meal-card"><div class="meal-emoji">${m.emoji||'🍽️'}</div>${m.img?`<img src="${m.img}">`:''}<div class="grow"><b>${m.label}</b><div>${m.qualityCn||m.quality} · ${m.score}/100 · ${m.servings}份</div></div><button class="small-button" data-eat="${m.id}">选择椅子吃</button><button class="small-button secondary" data-together="${m.id}" ${m.servings<2?'disabled':''}>一起吃</button></div>`).join('');
 modal('Dining ♡',`<p>现在不是直接扣掉食物：先选择厨房餐桌<strong>实际位置的椅子</strong> → 拉椅子 → 坐下 → 吃饭 → 拿盘子去洗。</p><div class="meal-list">${cards}</div>`);
 document.querySelectorAll('[data-eat]').forEach(b=>b.onclick=()=>chooseDiningChairs(b.dataset.eat,false));
 document.querySelectorAll('[data-together]').forEach(b=>b.onclick=()=>chooseDiningChairs(b.dataset.together,true));
}
function diningOverlay(inner){
 document.querySelector('.dining-play-overlay')?.remove();$('#modalRoot').innerHTML='';
 const el=document.createElement('section');el.className='dining-play-overlay';el.innerHTML=`<div class="dining-scene"></div><div class="dining-shade"></div><button class="fp-close" id="diningClose">✕</button>${inner}`;document.body.appendChild(el);$('#diningClose').onclick=()=>el.remove();return el;
}
function chooseDiningChairs(mealId,together){
 const meal=state.preparedMeals.find(m=>m.id===mealId);if(!meal)return;
 let chosen=[];
 const el=diningOverlay(`<div class="chair-select-title"><span>DINING</span><h1>${together?'选择两张椅子':'选择要坐的椅子'}</h1><p id="chairPrompt">${together?'先选择 '+activeName()+' 的椅子':'点击餐桌旁真正的椅子位置'}</p></div><div id="chairHitLayer"></div>`);
 const layer=$('#chairHitLayer');
 DINING_CHAIRS.forEach((c,i)=>{const b=document.createElement('button');b.className='chair-hit';b.style.left=c.x+'%';b.style.top=c.y+'%';b.dataset.chair=c.id;b.innerHTML=`<span>${i+1}</span>`;layer.appendChild(b)});
 layer.querySelectorAll('.chair-hit').forEach(b=>b.onclick=()=>{
  if(chosen.includes(b.dataset.chair))return;
  chosen.push(b.dataset.chair);b.classList.add('picked');
  if(together&&chosen.length===1){$('#chairPrompt').textContent=`再选择 ${partnerName()} 的椅子（不能同一张）`;return}
  runDiningSequence(mealId,together,chosen);
 });
}
function seatedActorHtml(person){
 return `<div class="seated-person ${person}"><img src="./assets/sprites/${person}-sit.png"><span class="eat-hand">🥄</span></div>`;
}
function runDiningSequence(mealId,together,chairIds){
 const meal=state.preparedMeals.find(m=>m.id===mealId);if(!meal)return;
 const people=together?[state.active,state.active==='elyn'?'shawn':'elyn']:[state.active];
 const chairs=chairIds.map(id=>DINING_CHAIRS.find(c=>c.id===id));
 const el=diningOverlay(`<div class="dining-status" id="diningStatus">走到椅子旁…</div><div id="diningActors"></div><div id="diningChairs"></div><div id="diningPlates"></div>`);
 const actors=$('#diningActors'),chairsRoot=$('#diningChairs'),plates=$('#diningPlates');
 people.forEach((p,i)=>{
  const c=chairs[i];const chair=document.createElement('div');chair.className='interactive-kitchen-chair';chair.style.left=c.x+'%';chair.style.top=c.y+'%';chair.style.setProperty('--px',c.pullX+'vw');chair.style.setProperty('--py',c.pullY+'vh');chair.innerHTML='<i></i><b></b>';chairsRoot.appendChild(chair);
  const wrap=document.createElement('div');wrap.innerHTML=seatedActorHtml(p);const a=wrap.firstChild;a.style.left=(c.x+c.pullX)+'%';a.style.top=(c.y+c.pullY-4)+'%';actors.appendChild(a);
  const plate=document.createElement('div');plate.className='dining-plate';plate.style.left=(c.x+(c.face==='left'?-5:c.face==='right'?5:0))+'%';plate.style.top=(c.y-10)+'%';plate.innerHTML=`<div class="food-portion">${meal.emoji||'🍽️'}</div><i></i>`;plates.appendChild(plate);
 });
 const status=$('#diningStatus'),chairEls=[...document.querySelectorAll('.interactive-kitchen-chair')],actorEls=[...document.querySelectorAll('.seated-person')];
 setTimeout(()=>{status.textContent='手扶椅背，拉开椅子…';chairEls.forEach(x=>x.classList.add('pulled'))},650);
 setTimeout(()=>{status.textContent='转身，慢慢坐下…';actorEls.forEach(x=>x.classList.add('sit-in'))},1450);
 setTimeout(()=>{chairEls.forEach(x=>x.classList.add('pushed'));status.innerHTML=`坐好了 ♡ <button class="mama-btn" id="beginEat">开始吃饭</button>`;$('#beginEat').onclick=()=>startVisibleEating(mealId,together)},2400);
}
function startVisibleEating(mealId,together){
 const meal=state.preparedMeals.find(m=>m.id===mealId);if(!meal)return;const actorEls=[...document.querySelectorAll('.seated-person')],portions=[...document.querySelectorAll('.food-portion')];$('#diningStatus').textContent='正在吃 '+meal.label+'…';
 let bite=0;const total=6;const timer=setInterval(()=>{bite++;actorEls.forEach(x=>x.classList.toggle('bite'));portions.forEach(p=>{p.style.transform=`scale(${Math.max(.2,1-bite/total*.78)})`;p.style.opacity=Math.max(.25,1-bite/total*.75)});if(bite>=total){clearInterval(timer);finishVisibleEating(mealId,together)}},650);
}
function finishVisibleEating(mealId,together){
 const m=state.preparedMeals.find(x=>x.id===mealId);if(!m)return;const n=together?2:1;m.servings-=n;state.dirtyDishes+=n;
 const bad=m.quality==='BURNT'||m.quality==='UNDERCOOKED'||m.quality==='NOT TASTY',great=m.quality==='PERFECT'||m.quality==='DELICIOUS';
 const eff=bad?{hunger:-28,mood:-7,health:-4}:great?{hunger:-48,mood:+12,health:+4}:{hunger:-40,mood:+6,health:+1};
 adjustNeeds(state.active,eff);if(together)adjustNeeds(state.active==='elyn'?'shawn':'elyn',eff);recordEvent('eatMeal',1);if(together)recordEvent('eatTogether',1);
 if(m.servings<=0)state.preparedMeals=state.preparedMeals.filter(x=>x.id!==mealId);save();
 document.querySelectorAll('.food-portion').forEach(x=>{x.textContent='';x.parentElement.classList.add('dirty')});
 $('#diningStatus').innerHTML=`吃完了 · ${m.qualityCn||m.quality} ♡ <button class="mama-btn" id="carryPlate">拿盘子去洗</button> <button class="mama-btn secondary" id="leavePlate">先放桌上</button>`;
 $('#leavePlate').onclick=()=>{document.querySelector('.dining-play-overlay')?.remove();toast(`留下 ${n} 个脏盘子`)};
 $('#carryPlate').onclick=()=>carryPlatesToSink(n);
}
function carryPlatesToSink(n){
 $('#diningStatus').textContent='拿起盘子，走去水槽…';const ps=[...document.querySelectorAll('.dining-plate')];ps.forEach((p,i)=>{p.classList.add('carrying');p.style.setProperty('--carryDelay',(i*.15)+'s')});
 setTimeout(()=>{document.querySelector('.dining-play-overlay')?.remove();toast('盘子已经拿到水槽 🫧');openDishwashingLegacy()},1500);
}
function openDishwashingLegacy(){
 if(state.dirtyDishes<=0){toast('现在没有脏盘子 ♡');return}
 modal('第一视角洗碗 🫧',`<p>用鼠标/手指来回刷盘子。剩余 ${state.dirtyDishes} 个脏盘子。</p><div style="display:grid;place-items:center"><div class="plate-wash" id="pw"><div class="wash-foam" id="foam"></div><div class="sponge" id="sponge"></div></div><b id="wp">0%</b></div>`);
 const p=$('#pw'),s=$('#sponge'),foam=$('#foam');let last=null,dist=0;p.onpointerdown=e=>{p.setPointerCapture?.(e.pointerId);last=[e.clientX,e.clientY]};p.onpointermove=e=>{if(!last)return;const r=p.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;s.style.left=Math.max(0,Math.min(r.width-65,x-32))+'px';s.style.top=Math.max(0,Math.min(r.height-42,y-21))+'px';dist+=Math.hypot(e.clientX-last[0],e.clientY-last[1]);last=[e.clientX,e.clientY];let pct=Math.min(100,Math.round(dist/900*100));$('#wp').textContent=pct+'%';foam.style.opacity=pct/100;if(pct>=100){last=null;state.dirtyDishes--;recordEvent('washDish',1);save();toast('洗干净一个盘子 ✓');setTimeout(()=>{$('#modalRoot').innerHTML='';if(state.dirtyDishes>0)openDishwashingLegacy()},450)}}
}


function getOutfit(person,id){return OUTFITS[person].find(o=>o.id===id)||OUTFITS[person][0]}
function humanSpriteSrc(person,dir='idle'){const o=getOutfit(person,state.outfits[person]);return `${o.spriteBase}/${dir}.png`}
function renderOutfitSprites(){['shawn','elyn'].forEach(p=>{const img=$('#'+p)?.querySelector('.base-sprite');if(img)img.src=humanSpriteSrc(p,'idle')})}
function renderOutfitOverlays(){renderOutfitSprites()}
function openWardrobe(){
 let person=state.active,cat='全部',selected=state.outfits[person],q='';
 const draw=()=>{const cur=getOutfit(person,selected);modal('衣帽间 · 合身版 40 套 / 每人',`<div class="wardrobe-v3"><div class="wardrobe-v3-toolbar"><div class="person-tabs"><button data-person="elyn" class="${person==='elyn'?'active':''}">Elyn · 40</button><button data-person="shawn" class="${person==='shawn'?'active':''}">Shawn · 40</button></div><input id="outfitSearch" class="search" placeholder="搜索衣服 / 鞋 / 配饰…"><div class="wardrobe-cats">${OUTFIT_CATS.map(c=>`<button data-cat="${c}" class="${c===cat?'active':''}">${c}</button>`).join('')}</div></div><div class="wardrobe-v3-body"><div class="wardrobe-v3-grid" id="wardrobeGrid"></div><aside class="wardrobe-v3-preview"><div class="fit-mirror"><img id="fitPreview" src="${cur.spriteBase}/idle.png"></div><h2 id="previewName">${cur.name}</h2><p id="outfitMeta">${cur.cat} · ${cur.shoes}<br>${cur.accessory}</p><button class="small-button" id="wearOutfit">穿上这套</button><button class="small-button secondary" id="favOutfit">♡ 收藏</button></aside></div></div>`);bind()};
 const filtered=()=>OUTFITS[person].filter(o=>(cat==='全部'||o.cat===cat)&&(!q||[o.name,o.cat,o.shoes,o.accessory].join(' ').includes(q)));
 const grid=()=>{const r=$('#wardrobeGrid');if(!r)return;r.innerHTML=filtered().map(o=>`<button class="fit-outfit-card ${selected===o.id?'selected':''}" data-outfit="${o.id}"><img src="${o.spriteBase}/idle.png"><b>${o.name}</b><span>${o.cat}</span><small>${o.shoes}</small></button>`).join('');r.querySelectorAll('[data-outfit]').forEach(b=>b.onclick=()=>{selected=b.dataset.outfit;const o=getOutfit(person,selected);document.querySelectorAll('.fit-outfit-card').forEach(x=>x.classList.toggle('selected',x===b));$('#fitPreview').src=o.spriteBase+'/idle.png';$('#previewName').textContent=o.name;$('#outfitMeta').innerHTML=`${o.cat} · ${o.shoes}<br>${o.accessory}`})};
 const bind=()=>{document.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>{person=b.dataset.person;selected=state.outfits[person];cat='全部';q='';draw()});document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{cat=b.dataset.cat;document.querySelectorAll('[data-cat]').forEach(x=>x.classList.toggle('active',x===b));grid()});$('#outfitSearch').oninput=e=>{q=e.target.value.trim();grid()};$('#wearOutfit').onclick=()=>{state.outfits[person]=selected;save();renderOutfitSprites();toast(`${person==='elyn'?'Elyn':'Shawn'} 换上了 ${getOutfit(person,selected).name} ♡`)};$('#favOutfit').onclick=()=>{const l=state.outfitFavorites[person],i=l.indexOf(selected);if(i>=0)l.splice(i,1);else l.push(selected);save();toast(i>=0?'取消收藏':'已收藏 ♡')};grid()};draw();
}

let engineOsc=null,engineGain=null;
function carColor(car){return car.id==='black'?'#15171b':'#f1f1ef'}
function startEngineSound(){if(!state.audio?.enabled||!state.audio?.sfx)return;ensureAudio();if(!audioCtx||engineOsc)return;engineOsc=audioCtx.createOscillator();engineGain=audioCtx.createGain();engineOsc.type='sawtooth';engineOsc.frequency.value=58;engineGain.gain.value=state.audio.sfxVolume*.028;engineOsc.connect(engineGain);engineGain.connect(audioCtx.destination);engineOsc.start()}
function revEngine(v=0.5){if(engineOsc)engineOsc.frequency.setTargetAtTime(58+v*145,audioCtx.currentTime,.08)}
function stopEngineSound(){if(engineOsc){try{engineOsc.stop()}catch(e){}engineOsc=null;engineGain=null}}
function carMeter(label,value,icon){return `<div class="car-meter"><span>${icon} ${label}</span><div><i style="width:${Math.max(0,Math.min(100,value))}%"></i></div><b>${Math.round(value)}%</b></div>`}
function openCarGarage(carId){
 const car=state.cars[carId];
 modal(`${car.name} · ${car.plate}`,`<div class="lexus-garage-panel"><div class="lexus-model"><img src="${car.model}"><span>${car.plate}</span></div><div class="car-stats">${carMeter('油量',car.fuel,'⛽')}${carMeter('清洁',car.clean,'✨')}${carMeter('车况',car.condition,'🛠️')}<div class="mileage">里程 <b>${Math.round(car.mileage).toLocaleString()} km</b><small>上次：${car.last}</small></div></div><div class="car-actions"><button class="card" id="startCar">🔑 发动</button><button class="card" id="driveCarBtn">🛣️ 开车挑战</button><button class="card" id="fuelCarBtn">⛽ 加油</button><button class="card" id="washCarBtn">🫧 洗车</button><button class="card" id="repairCarBtn">🛠️ 保养 / 修复</button></div></div>`);
 $('#startCar').onclick=()=>{startEngineSound();revEngine(.4);toast('Lexus 引擎启动…');setTimeout(()=>revEngine(.1),700)};
 $('#driveCarBtn').onclick=()=>openDriveDestinations(carId);$('#fuelCarBtn').onclick=()=>openRefuelGame(carId);$('#washCarBtn').onclick=()=>openCarWashGame(carId);$('#repairCarBtn').onclick=()=>{const missing=100-car.condition,cost=Math.ceil(missing*2);if(missing<1){toast('车况很好');return}if(state.coins<cost){toast(`需要 ${cost} coins`);return}state.coins-=cost;car.condition=100;save();toast('完成保养 · 车况 100%');openCarGarage(carId)};
}
function openDriveDestinations(carId){
 const car=state.cars[carId];modal('选择路线',`<div class="route-head"><img src="${car.model}"><div><b>${car.plate}</b><p>这次驾驶需要自己控制油门、刹车和方向。高速过弯、撞车、开出道路都会扣安全分和车况。</p></div></div><div class="destination-grid"><button class="destination-card" data-dest="lake"><span>🌅</span><b>湖边山路</b><small>8 km · 弯道多 · 中等</small></button><button class="destination-card" data-dest="store"><span>🏙️</span><b>城市超市</b><small>6 km · 车流多 · 中等</small></button><button class="destination-card" data-dest="fuel"><span>⛽</span><b>加油站</b><small>4 km · 短路线</small></button><button class="destination-card" data-dest="wash"><span>🫧</span><b>洗车中心</b><small>5 km · 施工区</small></button></div>`);
 document.querySelectorAll('[data-dest]').forEach(b=>b.onclick=()=>startHardDrive(carId,b.dataset.dest));
}
function startHardDrive(carId,dest){
 const car=state.cars[carId],dist={lake:8,store:6,fuel:4,wash:5}[dest]||5;if(car.fuel<8){toast('油量太低，先加油');return}
 $('#modalRoot').innerHTML='';const ov=document.createElement('section');ov.className='hard-drive-overlay';ov.innerHTML=`<div class="windshield"><div class="drive-sky2"></div><div class="road-world" id="roadWorld"><div class="road-edge left"></div><div class="road-edge right"></div><div class="road-center"></div><div id="hardTraffic"></div></div><div class="lexus-hood"><img src="${car.model}"></div></div><div class="cockpit"><div class="steering">◯</div><div class="dash-screen"><b>${car.plate}</b><span id="hardSpeed">0</span><small>km/h</small></div><div class="dash-bars"><span>⛽ <i id="fuelDrive">${Math.round(car.fuel)}%</i></span><span>🛠️ <i id="condDrive">${Math.round(car.condition)}%</i></span><span>🛣️ <i id="distDrive">0.0/${dist}km</i></span></div></div><div class="drive-warning" id="driveWarning">W 加速 · S 刹车 · A/D 转向</div><div class="hard-drive-controls"><button data-drive="left">←</button><button data-drive="gas">油门</button><button data-drive="brake">刹车</button><button data-drive="right">→</button></div><button class="drive-exit" id="hardExit">结束驾驶</button>`;
 document.body.appendChild(ov);startEngineSound();
 let speed=0,pos=0,progress=0,safety=100,collisions=0,curve=0,targetCurve=0,roadOffset=0,keys={},last=performance.now(),finished=false,spawnTimer=0,speedLimit=70,weatherGrip=(state.weather==='小雨'||state.weather==='阵雨')?.78:1;
 const controls={gas:false,brake:false,left:false,right:false};
 document.querySelectorAll('[data-drive]').forEach(b=>{const k=b.dataset.drive;b.onpointerdown=e=>{controls[k]=true;b.setPointerCapture?.(e.pointerId)};b.onpointerup=()=>controls[k]=false;b.onpointercancel=()=>controls[k]=false});
 const keydown=e=>{keys[e.key.toLowerCase()]=true};const keyup=e=>{keys[e.key.toLowerCase()]=false};window.addEventListener('keydown',keydown);window.addEventListener('keyup',keyup);
 const traffic=[];
 const spawn=()=>{const el=document.createElement('div');const x=(Math.random()-.5)*1.35;el.className='hard-traffic';el.innerHTML=Math.random()>.18?'🚙':'🚧';$('#hardTraffic').appendChild(el);traffic.push({el,x,z:0,speed:Math.random()>.5?26:0,hit:false})};
 const cleanup=()=>{window.removeEventListener('keydown',keydown);window.removeEventListener('keyup',keyup);stopEngineSound();ov.remove()};
 $('#hardExit').onclick=()=>{finished=true;cleanup();toast('驾驶结束')};
 const loop=now=>{if(finished)return;const dt=Math.min(.04,(now-last)/1000);last=now;
  const gas=keys['w']||keys['arrowup']||controls.gas,brake=keys['s']||keys['arrowdown']||controls.brake,left=keys['a']||keys['arrowleft']||controls.left,right=keys['d']||keys['arrowright']||controls.right;
  if(gas)speed+=42*dt;else speed-=8*dt;if(brake)speed-=70*dt;speed=Math.max(0,Math.min(145,speed));
  const steer=(right?1:0)-(left?1:0);pos+=steer*(.42+.012*speed)*dt*weatherGrip;pos-=curve*speed*.00065*dt;pos=Math.max(-1.35,Math.min(1.35,pos));
  if(Math.random()<dt*.14)targetCurve=(Math.random()-.5)*1.25;curve+=(targetCurve-curve)*dt*.6;roadOffset=curve*90;
  speedLimit=Math.abs(curve)>.65?55:Math.abs(curve)>.35?70:90;
  if(speed>speedLimit+18){safety-=dt*5;$('#driveWarning').textContent=`⚠️ 弯道限速 ${speedLimit}，你太快了！`}else if(Math.abs(pos)>.9){safety-=dt*9;car.condition-=dt*1.7;$('#driveWarning').textContent='⚠️ 快开出道路了！'}else $('#driveWarning').textContent=`限速 ${speedLimit} · 安全分 ${Math.max(0,Math.round(safety))}`;
  progress+=speed*dt/3600;car.fuel=Math.max(0,car.fuel-speed*dt*.00048);car.clean=Math.max(0,car.clean-dt*.018*(1+speed/90));revEngine(speed/145);
  spawnTimer+=dt;if(spawnTimer>1.6-Math.min(.6,speed/220)){spawnTimer=0;spawn()}
  traffic.forEach(t=>{t.z+=dt*(.22+speed/190);const perspective=Math.min(1,t.z);const px=50+t.x*28/(1.1-perspective*.5)+roadOffset*.12;const py=20+perspective*72;t.el.style.left=px+'%';t.el.style.top=py+'%';t.el.style.transform=`translate(-50%,-50%) scale(${.35+perspective*1.15})`;if(!t.hit&&t.z>.78&&t.z<1.0&&Math.abs(t.x-pos)<.34){t.hit=true;collisions++;safety-=18;car.condition=Math.max(0,car.condition-8);speed*=.58;t.el.classList.add('crash');$('#driveWarning').textContent='💥 碰撞！刹车和转向要更早';adjustNeeds(state.active,{mood:-3})}if(t.z>1.18){t.el.remove();t.dead=true}});for(let i=traffic.length-1;i>=0;i--)if(traffic[i].dead)traffic.splice(i,1);
  $('#roadWorld').style.transform=`perspective(700px) rotateZ(${curve*3}deg) translateX(${roadOffset}px)`;$('.steering').style.transform=`rotate(${steer*38-curve*12}deg)`;$('#hardSpeed').textContent=Math.round(speed);$('#fuelDrive').textContent=Math.round(car.fuel)+'%';$('#condDrive').textContent=Math.round(car.condition)+'%';$('#distDrive').textContent=`${Math.min(dist,progress).toFixed(1)}/${dist}km`;
  if(car.fuel<=0){finished=true;state.coins=Math.max(0,state.coins-80);save();cleanup();modal('没油了 😵',`<p>道路救援扣除 80 coins。下次出发前记得检查油量。</p>`);return}
  if(progress>=dist){finished=true;car.mileage+=dist;car.last={lake:'湖边',store:'城市超市',fuel:'加油站',wash:'洗车中心'}[dest];recordEvent('driveCar',1);save();const grade=safety>=90?'S':safety>=80?'A':safety>=65?'B':safety>=45?'C':'D';cleanup();modal('到达目的地',`<div class="drive-result"><img src="${car.model}"><h1>驾驶评级 ${grade}</h1><p>安全分 ${Math.max(0,Math.round(safety))} · 碰撞 ${collisions} · 车况 ${Math.round(car.condition)}%</p><button class="small-button" id="arriveContinue">继续</button></div>`);$('#arriveContinue').onclick=()=>{$('#modalRoot').innerHTML='';arriveByCar(carId,dest)};return}
  requestAnimationFrame(loop)};requestAnimationFrame(loop);
}
function arriveByCar(carId,dest){if(dest==='lake'){state.room='lake';showGame();toast('开到湖边了 ♡');return}if(dest==='fuel'){openRefuelGame(carId);return}if(dest==='wash'){openCarWashGame(carId);return}openDriveShop(carId)}
function openDriveShop(carId){modal('城市超市 🛒',`<p>开车出来采购。Coins：${state.coins}</p><div class="grid"><button class="card" data-buy="groceries">🥚 基础食材补给 · 120</button><button class="card" data-buy="seeds">🌱 种子 +8 · 70</button><button class="card" data-buy="bait">🎣 普通鱼饵 +8 · 55</button><button class="card" data-buy="premium">🪱 高级鱼饵 +2 · 100</button><button class="card" data-buy="pet">🐾 宠物食品 · 60</button></div>`);document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const type=b.dataset.buy,cost={groceries:120,seeds:70,bait:55,premium:100,pet:60}[type];if(state.coins<cost){toast('Coins 不够');return}state.coins-=cost;if(type==='groceries')Object.entries(DEFAULT_FRIDGE).forEach(([id,n])=>state.fridge[id]=Math.max(state.fridge[id]||0,Math.ceil(n*.85)));if(type==='seeds')state.seeds+=8;if(type==='bait')state.bait+=8;if(type==='premium')state.premiumBait+=2;if(type==='pet'){adjustNeeds('dudu',{hunger:-20});adjustNeeds('bubu',{hunger:-20})}save();renderTaskUI();toast('购买完成 ♡')})}
function openRefuelGame(carId){const car=state.cars[carId];modal(`加油 · ${car.plate}`,`<div class="fuel-game"><img class="fuel-car-model" src="${car.model}">${carMeter('当前油量',car.fuel,'⛽')}<p>按住油枪加油。每增加约 2% 消耗 1 coin。</p><button class="small-button hold" id="fuelHold">按住油枪</button><div id="fuelCost">本次 0 coins</div></div>`);let hold=false,spent=0,timer=null,startedFuel=car.fuel;const stop=()=>{if(!hold)return;hold=false;clearInterval(timer);if(car.fuel>startedFuel){recordEvent('refuelCar',1);save();renderTaskUI();toast(`加油完成 · ${Math.round(car.fuel)}%`)}};const b=$('#fuelHold');b.onpointerdown=e=>{hold=true;b.setPointerCapture?.(e.pointerId);timer=setInterval(()=>{if(car.fuel>=100||state.coins<=0){stop();return}car.fuel=Math.min(100,car.fuel+1.6);if(Math.floor(car.fuel/2)>Math.floor((car.fuel-1.6)/2)){state.coins--;spent++}$('#fuelCost').textContent=`油量 ${Math.round(car.fuel)}% · 本次 ${spent} coins`;save()},90)};b.onpointerup=stop;b.onpointercancel=stop}
function openCarWashGame(carId){const car=state.cars[carId];if(state.coins<20){toast('需要 20 coins 洗车用品');return}state.coins-=20;save();modal(`DIY 洗车 · ${car.plate}`,`<p>用鼠标 / 手指在 Lexus 车身上来回刷。</p><div class="wash-real-car" id="washCarZone"><img src="${car.model}"><div class="mud-layer" id="mudLayer"></div><div class="wash-nozzle" id="washNozzle">🧽</div></div><div class="gesture-progress"><i id="carWashProg"></i></div><b id="carWashText">0%</b>`);let last=null,dist=0,done=false;const z=$('#washCarZone'),noz=$('#washNozzle'),mud=$('#mudLayer');z.onpointerdown=e=>{z.setPointerCapture?.(e.pointerId);last=[e.clientX,e.clientY]};z.onpointermove=e=>{if(!last||done)return;const r=z.getBoundingClientRect();noz.style.left=(e.clientX-r.left-24)+'px';noz.style.top=(e.clientY-r.top-24)+'px';dist+=Math.hypot(e.clientX-last[0],e.clientY-last[1]);last=[e.clientX,e.clientY];const pct=Math.min(100,dist/1100*100);$('#carWashProg').style.width=pct+'%';$('#carWashText').textContent=Math.round(pct)+'%';mud.style.opacity=1-pct/100;if(pct>=100){done=true;car.clean=100;recordEvent('washCar',1);save();renderTaskUI();toast('Lexus 洗得亮晶晶 ✨')}}}


function openTaskHandbook(defaultTab='daily'){initTasksIfNeededOnly();checkAchievements();const tabs=[['daily','今日任务'],['weekly','每周任务'],['couple','情侣任务 ❤️'],['special','特殊任务 ✨'],['ach','成就'],['guide','系统说明']];const ov=document.createElement('section');ov.className='taskbook-overlay';ov.innerHTML=`<div class="taskbook-bg"></div><div class="taskbook-panel"><header class="taskbook-header"><div><span>OUR LITTLE WORLD</span><h1>任务手册</h1><p>任务负责给你方向、Coins、EXP 和 Love。</p></div><button id="taskBookClose">✕</button></header><div class="taskbook-currency">${currencyGuideCards()}</div><nav class="taskbook-tabs">${tabs.map(([i,t])=>`<button data-manual-tab="${i}" class="${i===defaultTab?'active':''}">${t}</button>`).join('')}</nav><main id="taskbookContent"></main></div>`;document.body.appendChild(ov);$('#taskBookClose').onclick=()=>ov.remove();const render=tab=>{const c=$('#taskbookContent');document.querySelectorAll('[data-manual-tab]').forEach(b=>b.classList.toggle('active',b.dataset.manualTab===tab));if(tab==='daily')c.innerHTML=`<div class="manual-section-head"><h2>今日任务</h2><p>每天自动刷新，稳定赚 Coins 和 EXP。</p></div><div class="manual-list">${state.dailyTasks.map(t=>taskCardHtml(t,taskDef(t.id))).join('')}</div>`;if(tab==='weekly')c.innerHTML=`<div class="manual-section-head"><h2>每周任务</h2><p>一周内慢慢完成，奖励明显更高。</p></div><div class="manual-list">${state.weeklyTasks.map(t=>taskCardHtml(t,extendedTaskDef(t.id))).join('')}</div>`;if(tab==='couple')c.innerHTML=`<div class="manual-section-head"><h2>情侣任务 ❤️</h2><p>主要增加 Love。</p></div><div class="manual-list">${state.coupleTasks.map(t=>taskCardHtml(t,extendedTaskDef(t.id))).join('')}</div>`;if(tab==='special'){const d=state.activeSpecial?taskDef(state.activeSpecial.id,true):null;c.innerHTML=`<div class="manual-section-head"><h2>特殊任务 ✨</h2><p>只完成一次，完成后不会重复。</p></div>${d?`<div class="manual-list">${taskCardHtml(state.activeSpecial,d)}</div>`:'<div class="manual-empty">所有特殊任务都完成了 ♡</div>'}<p>已完成 ${state.completedSpecialIds.length}/${SPECIAL_TASK_POOL.length}</p>`}if(tab==='ach')c.innerHTML=`<div class="manual-section-head"><h2>成就</h2><p>长期收藏，不会每天刷新。</p></div><div class="achievement-grid">${ACHIEVEMENTS.map(a=>{const done=state.achievementIds.includes(a.id),v=a.condition==='love'?state.love:(state.eventStats[a.event]||0);return `<div class="achievement-card ${done?'done':''}"><span>${done?'🏆':'🔒'}</span><b>${a.title}</b><p>${a.desc}</p><small>${Math.min(v,a.target)}/${a.target} · +${a.coins||0}🪙 +${a.xp||0}XP</small></div>`}).join('')}</div>`;if(tab==='guide')c.innerHTML=`<div class="system-guide"><section><h3>🪙 Coins = 生活的钱</h3><p>买食材、种子、鱼饵、宠物用品、加油、洗车、保养。Coins 会花掉。</p></section><section><h3>✨ EXP = 成长等级</h3><p>不会花掉。做事情与任务获得，用于升级与之后解锁内容。</p></section><section><h3>❤️ Love = 两人的关系</h3><p>一起吃饭、抱抱、约会和情侣任务增加。重复狂点同一互动会递减。</p></section><section><h3>📖 Tasks = 游戏方向</h3><p>今日＝短目标；每周＝长期目标；情侣＝Love；特殊＝一次性；成就＝长期收藏。</p></section></div>`};document.querySelectorAll('[data-manual-tab]').forEach(b=>b.onclick=()=>render(b.dataset.manualTab));render(defaultTab)}
function currencyGuideCards(){const li=levelInfo(),l=loveInfo();return `<div><span>🪙</span><b>${state.coins}</b><small>Coins · 会花掉</small></div><div><span>✨</span><b>Lv.${li.level}</b><small>${li.inLevel}/${li.need} EXP</small></div><div><span>❤️</span><b>${state.love}</b><small>Love Lv.${l.level} · ${l.name}</small></div>`}
function showTypedBubble(actor,text){const b=$('#'+actor+'ChatBubble');if(!b)return;b.textContent=text;b.classList.remove('hidden');clearTimeout(b._t);b._t=setTimeout(()=>b.classList.add('hidden'),6500)}
function controlledActorForChat(){return state.playMode==='room'&&state.netRole?state.netRole:state.active}
function sendTypedChat(text=null,actor=null,remote=false){const input=$('#chatInput'),msg=(text??input?.value??'').trim();if(!msg)return;const who=actor||controlledActorForChat(),name=who==='elyn'?'Elyn':'Shawn';state.chatHistory.push({actor:who,name,text:msg,time:Date.now()});state.chatHistory=state.chatHistory.slice(-50);showTypedBubble(who,msg);say(name,msg);if(input&&!remote)input.value='';if(!remote){recordEvent('sendChat',1);netSend({type:'chat',actor:who,text:msg})}save()}
function openChatHistory(){const rows=[...state.chatHistory].reverse().map(m=>`<div class="chat-history-row ${m.actor}"><b>${m.name}</b><span>${m.text}</span><small>${new Date(m.time).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</small></div>`).join('');modal('聊天记录 · 最近50条',rows?`<div class="chat-history">${rows}</div>`:'<p>还没有聊天记录。</p>')}
let netChannel=null,netLastMove=0;
function netSend(payload){if(!netChannel||state.playMode!=='room')return;try{netChannel.postMessage({...payload,room:state.netRoom,source:state.netRole,ts:Date.now()})}catch(e){}}
function closeNetChannel(){if(netChannel){try{netChannel.close()}catch(e){}netChannel=null}}
function joinBroadcastRoom(code,role){closeNetChannel();state.playMode='room';state.netRoom=code.toUpperCase();state.netRole=role;state.active=role;save();netChannel=new BroadcastChannel('shawn-elyn-'+state.netRoom);netChannel.onmessage=e=>{const m=e.data||{};if(m.source===state.netRole)return;if(m.type==='move'&&m.actor){setPos(m.actor,m.pos);const img=$('#'+m.actor)?.querySelector('.base-sprite');if(img&&m.dir)img.src=humanSpriteSrc(m.actor,m.dir)}if(m.type==='chat')sendTypedChat(m.text,m.actor,true);if(m.type==='room'&&m.roomId){state.room=m.roomId;enterRoom(m.roomId,false)}if(m.type==='sync'&&m.shared){Object.assign(state,m.shared);renderTaskUI();renderNeedsUI();renderOutfitSprites();save()}};netSend({type:'sync',shared:{coins:state.coins,xpTotal:state.xpTotal,love:state.love,room:state.room}});renderCoopStatus();toast(`加入房间 ${state.netRoom} · 控制 ${role==='elyn'?'Elyn':'Shawn'}`)}
function renderCoopStatus(){const e=$('#coopCurrent');if(e)e.innerHTML=`<b>当前：</b>${state.playMode==='single'?'单人':state.playMode==='localCoop'?'本机双人':`同步房间 ${state.netRoom} · ${state.netRole}`}`;const b=$('#coopBtn');if(b)b.textContent=state.playMode==='single'?'👥 双人':state.playMode==='localCoop'?'👥 本机双人':'🔗 '+state.netRoom}
function openCoopPanel(){modal('双人游戏 👥',`<div class="coop-shell"><section><h3>本机双人 · 立即可玩</h3><p>Elyn=WASD，Shawn=方向键，可以同时移动。</p><button class="small-button" id="localCoopBtn">开启本机双人</button></section><section><h3>同浏览器同步房间</h3><p>两个相同游戏标签页输入同一房间码，一个控制 Elyn，一个控制 Shawn。位置和文字对话实时同步。</p><div class="coop-form"><input id="roomCodeInput" class="search" maxlength="10" placeholder="例如 LOVE0309"><select id="roomRole"><option value="elyn">我是 Elyn</option><option value="shawn">我是 Shawn</option></select><button class="small-button" id="joinRoomBtn">加入房间</button></div></section><section class="coop-note"><h3>跨设备联机</h3><p>不同手机/电脑真正联网仍需要 Firebase / Supabase / WebRTC 信令后端；纯静态 StackBlitz 本身没有服务器。这版已经把双人控制、房间码、同步协议与聊天做好。</p></section><button class="small-button secondary" id="singleModeBtn">切回单人</button><div id="coopCurrent"></div></div>`);$('#localCoopBtn').onclick=()=>{closeNetChannel();state.playMode='localCoop';state.netRoom='';state.netRole='';save();renderCoopStatus();$('#modalRoot').innerHTML='';toast('Elyn=WASD · Shawn=方向键')};$('#joinRoomBtn').onclick=()=>{const c=$('#roomCodeInput').value.trim().replace(/[^A-Za-z0-9]/g,'').slice(0,10);if(c.length<4){toast('房间码至少4位');return}joinBroadcastRoom(c,$('#roomRole').value);$('#modalRoot').innerHTML=''};$('#singleModeBtn').onclick=()=>{closeNetChannel();state.playMode='single';state.netRoom='';state.netRole='';save();renderCoopStatus();$('#modalRoot').innerHTML='';toast('切回单人')};renderCoopStatus()}

function openSimple(title,text){modal(title,`<p>${text}</p>`)}
$('#continueBtn').onclick=()=>{state.started=true;ensureAudio();showGame()};$('#newBtn').onclick=()=>{localStorage.removeItem('worldRebuild1');location.reload()};$('#albumBtn').onclick=()=>openSimple('相册','之后会收录钓鱼、种花、约会、情侣互动和生活照片。');$('#settingsBtn').onclick=openSoundSettings;$('#taskBookBtn').onclick=()=>openTaskHandbook('daily');$('#musicBtn').onclick=toggleBgm;$('#mapBtn').onclick=openMap;$('#closeMapBtn').onclick=showGame;$('#switchBtn').onclick=switchActor;$('#coopBtn').onclick=openCoopPanel;$('#sendChatBtn').onclick=()=>sendTypedChat();$('#phoneBtn').onclick=openChatHistory;$('#bagBtn').onclick=()=>{const li=levelInfo(),l=loveInfo();openSimple('背包 & 成长',`🪙 <b>${state.coins} Coins</b>：买东西，会花掉。<br>✨ <b>Lv.${li.level} · ${li.inLevel}/${li.need} EXP</b>：升级，不会花掉。<br>❤️ <b>${state.love}/1000 · ${l.name}</b>：情侣关系。<br><br>🌱 种子 ${state.seeds} · 🎣 鱼饵 ${state.bait}`)};
function clock(){const d=new Date(),h=d.getHours(),m=String(d.getMinutes()).padStart(2,'0');$('#clockText').textContent=`${String(h).padStart(2,'0')}:${m} ${h<12?'早上':h<18?'下午':'晚上'}`}
buildTabs();buildMap();clock();applyNeedsElapsed();initTasks();initExtendedTasks();renderNeedsUI();renderMapHud();renderOutfitSprites();renderCoopStatus();updateMusicButton();
setInterval(()=>{clock();applyNeedsElapsed();initTasksIfNeededOnly();renderTaskUI();renderNeedsUI();renderMapHud();needComment();save();},30000);
requestAnimationFrame(keyboardLoop);if(state.started)showGame();
