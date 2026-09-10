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
    {x:57,y:55,w:22,h:22,label:'🎣 钓鱼',action:'fish',objectHit:true}]}
};
const ROOM_ORDER=['living','kitchen','bedroom','bathroom','study','closet','balcony','garage','garden','lake'];
const MAP_POS={living:[52,48],kitchen:[68,45],bedroom:[44,23],bathroom:[59,24],study:[73,24],closet:[52,24],balcony:[24,22],garage:[23,48],garden:[38,72],lake:[9,86]};
const SPRITES={
 elyn:{idle:'elyn-idle.png',down:'elyn-down.png',up:'elyn-up.png',left:'elyn-left.png',right:'elyn-right.png'},
 shawn:{idle:'shawn-idle.png',down:'shawn-down.png',up:'shawn-up.png',left:'shawn-left.png',right:'shawn-right.png'}
};


const OUTFITS={"elyn":[{"id":"er01","name":"Basic White Tee + Denim Shorts","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er01","asset":"./assets/wardrobe_real/outfits/elyn/er01/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/01.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/01.png","./assets/wardrobe_original/clean_pieces/elyn/socks/02.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/01.png","./assets/wardrobe_original/clean_pieces/elyn/bags/02.png"],"desc":"日常 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er02","name":"Baby Pink Tee + Skort","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er02","asset":"./assets/wardrobe_real/outfits/elyn/er02/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/02.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/05.png","./assets/wardrobe_original/clean_pieces/elyn/socks/03.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/04.png","./assets/wardrobe_original/clean_pieces/elyn/bags/03.png"],"desc":"日常 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er03","name":"Striped Tee + Wide Leg Jeans","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er03","asset":"./assets/wardrobe_real/outfits/elyn/er03/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/03.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/11.png","./assets/wardrobe_original/clean_pieces/elyn/socks/04.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/03.png","./assets/wardrobe_original/clean_pieces/elyn/bags/04.png"],"desc":"日常 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er04","name":"Graphic Tee + Black Shorts","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er04","asset":"./assets/wardrobe_real/outfits/elyn/er04/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/04.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/03.png","./assets/wardrobe_original/clean_pieces/elyn/socks/05.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/14.png","./assets/wardrobe_original/clean_pieces/elyn/bags/05.png"],"desc":"日常 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er05","name":"Ribbon Top + Mini Skirt","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er05","asset":"./assets/wardrobe_real/outfits/elyn/er05/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/05.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/06.png","./assets/wardrobe_original/clean_pieces/elyn/socks/06.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/05.png","./assets/wardrobe_original/clean_pieces/elyn/bags/06.png"],"desc":"日常 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er06","name":"Lace Camisole + Pleated Skirt","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er06","asset":"./assets/wardrobe_real/outfits/elyn/er06/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/06.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/07.png","./assets/wardrobe_original/clean_pieces/elyn/socks/07.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/01.png","./assets/wardrobe_original/clean_pieces/elyn/bags/07.png"],"desc":"日常 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er07","name":"Tube Top + Straight Jeans","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er07","asset":"./assets/wardrobe_real/outfits/elyn/er07/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/07.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/12.png","./assets/wardrobe_original/clean_pieces/elyn/socks/08.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/13.png","./assets/wardrobe_original/clean_pieces/elyn/bags/08.png"],"desc":"日常 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er08","name":"Knit Top + Denim Skirt","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er08","asset":"./assets/wardrobe_real/outfits/elyn/er08/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/08.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/08.png","./assets/wardrobe_original/clean_pieces/elyn/socks/09.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/06.png","./assets/wardrobe_original/clean_pieces/elyn/bags/09.png"],"desc":"日常 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er09","name":"Cardigan + Ruffle Skirt","cat":"工作","price":465,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er09","asset":"./assets/wardrobe_real/outfits/elyn/er09/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/09.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/19.png","./assets/wardrobe_original/clean_pieces/elyn/socks/10.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/08.png","./assets/wardrobe_original/clean_pieces/elyn/bags/10.png"],"desc":"工作 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er10","name":"Polo Top + Suit Pants","cat":"工作","price":500,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er10","asset":"./assets/wardrobe_real/outfits/elyn/er10/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/10.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/16.png","./assets/wardrobe_original/clean_pieces/elyn/socks/11.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/06.png","./assets/wardrobe_original/clean_pieces/elyn/bags/11.png"],"desc":"工作 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er11","name":"Shirt + White Shorts","cat":"工作","price":355,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er11","asset":"./assets/wardrobe_real/outfits/elyn/er11/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/11.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/02.png","./assets/wardrobe_original/clean_pieces/elyn/socks/12.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/07.png","./assets/wardrobe_original/clean_pieces/elyn/bags/12.png"],"desc":"工作 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er12","name":"Oversize Shirt + Baggy Pants","cat":"工作","price":390,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er12","asset":"./assets/wardrobe_real/outfits/elyn/er12/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/12.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/13.png","./assets/wardrobe_original/clean_pieces/elyn/socks/13.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/03.png","./assets/wardrobe_original/clean_pieces/elyn/bags/13.png"],"desc":"工作 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er13","name":"Cropped Shirt + Cargo Shorts","cat":"工作","price":425,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er13","asset":"./assets/wardrobe_real/outfits/elyn/er13/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/13.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/04.png","./assets/wardrobe_original/clean_pieces/elyn/socks/14.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/17.png","./assets/wardrobe_original/clean_pieces/elyn/bags/14.png"],"desc":"工作 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er14","name":"Sweater + Track Pants","cat":"休闲","price":380,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er14","asset":"./assets/wardrobe_real/outfits/elyn/er14/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/14.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/15.png","./assets/wardrobe_original/clean_pieces/elyn/socks/15.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/14.png","./assets/wardrobe_original/clean_pieces/elyn/bags/15.png"],"desc":"休闲 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er15","name":"Hoodie + Wide Leg Jeans","cat":"休闲","price":415,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er15","asset":"./assets/wardrobe_real/outfits/elyn/er15/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/15.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/11.png","./assets/wardrobe_original/clean_pieces/elyn/socks/01.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/16.png","./assets/wardrobe_original/clean_pieces/elyn/bags/16.png"],"desc":"休闲 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er16","name":"Zip Up + Tiered Skirt","cat":"休闲","price":270,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er16","asset":"./assets/wardrobe_real/outfits/elyn/er16/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/16.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/20.png","./assets/wardrobe_original/clean_pieces/elyn/socks/02.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/15.png","./assets/wardrobe_original/clean_pieces/elyn/bags/17.png"],"desc":"休闲 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er17","name":"Denim Jacket + Straight Jeans","cat":"休闲","price":305,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er17","asset":"./assets/wardrobe_real/outfits/elyn/er17/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/17.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/12.png","./assets/wardrobe_original/clean_pieces/elyn/socks/03.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/18.png","./assets/wardrobe_original/clean_pieces/elyn/bags/18.png"],"desc":"休闲 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er18","name":"Leather Jacket + Leather Pants","cat":"休闲","price":340,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er18","asset":"./assets/wardrobe_real/outfits/elyn/er18/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/18.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/17.png","./assets/wardrobe_original/clean_pieces/elyn/socks/04.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/09.png","./assets/wardrobe_original/clean_pieces/elyn/bags/19.png"],"desc":"休闲 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er19","name":"Blazer + Suit Pants","cat":"休闲","price":375,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er19","asset":"./assets/wardrobe_real/outfits/elyn/er19/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/19.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/16.png","./assets/wardrobe_original/clean_pieces/elyn/socks/05.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/08.png","./assets/wardrobe_original/clean_pieces/elyn/bags/20.png"],"desc":"休闲 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er20","name":"Coat + Cargo Pants","cat":"休闲","price":410,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er20","asset":"./assets/wardrobe_real/outfits/elyn/er20/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/20.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/14.png","./assets/wardrobe_original/clean_pieces/elyn/socks/06.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/10.png","./assets/wardrobe_original/clean_pieces/elyn/bags/01.png"],"desc":"休闲 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er21","name":"White Dress · Platform Shoes","cat":"睡衣","price":205,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er21","asset":"./assets/wardrobe_real/outfits/elyn/er21/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/01.png","./assets/wardrobe_original/clean_pieces/elyn/socks/13.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/04.png","./assets/wardrobe_original/clean_pieces/elyn/bags/06.png"],"desc":"睡衣 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er22","name":"Floral Dress · Ballet Flats","cat":"睡衣","price":240,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er22","asset":"./assets/wardrobe_real/outfits/elyn/er22/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/02.png","./assets/wardrobe_original/clean_pieces/elyn/socks/15.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/07.png","./assets/wardrobe_original/clean_pieces/elyn/bags/11.png"],"desc":"睡衣 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er23","name":"Pink Dress · Long Boots","cat":"睡衣","price":275,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er23","asset":"./assets/wardrobe_real/outfits/elyn/er23/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/03.png","./assets/wardrobe_original/clean_pieces/elyn/socks/02.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/10.png","./assets/wardrobe_original/clean_pieces/elyn/bags/16.png"],"desc":"睡衣 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er24","name":"Black Dress · Canvas Shoes","cat":"睡衣","price":310,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er24","asset":"./assets/wardrobe_real/outfits/elyn/er24/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/04.png","./assets/wardrobe_original/clean_pieces/elyn/socks/04.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/13.png","./assets/wardrobe_original/clean_pieces/elyn/bags/01.png"],"desc":"睡衣 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er25","name":"Knit Dress · Furry Boots","cat":"睡衣","price":345,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er25","asset":"./assets/wardrobe_real/outfits/elyn/er25/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/05.png","./assets/wardrobe_original/clean_pieces/elyn/socks/06.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/16.png","./assets/wardrobe_original/clean_pieces/elyn/bags/06.png"],"desc":"睡衣 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er26","name":"Denim Dress · Western Boots","cat":"礼服","price":530,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er26","asset":"./assets/wardrobe_real/outfits/elyn/er26/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/06.png","./assets/wardrobe_original/clean_pieces/elyn/socks/08.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/19.png","./assets/wardrobe_original/clean_pieces/elyn/bags/11.png"],"desc":"礼服 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er27","name":"Shirt Dress · Black Sneakers","cat":"礼服","price":565,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er27","asset":"./assets/wardrobe_real/outfits/elyn/er27/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/07.png","./assets/wardrobe_original/clean_pieces/elyn/socks/10.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/02.png","./assets/wardrobe_original/clean_pieces/elyn/bags/16.png"],"desc":"礼服 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er28","name":"Slip Dress · Mary Janes","cat":"礼服","price":600,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er28","asset":"./assets/wardrobe_real/outfits/elyn/er28/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/08.png","./assets/wardrobe_original/clean_pieces/elyn/socks/12.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/05.png","./assets/wardrobe_original/clean_pieces/elyn/bags/01.png"],"desc":"礼服 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er29","name":"Party Dress · Heels","cat":"礼服","price":635,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er29","asset":"./assets/wardrobe_real/outfits/elyn/er29/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/09.png","./assets/wardrobe_original/clean_pieces/elyn/socks/14.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/08.png","./assets/wardrobe_original/clean_pieces/elyn/bags/06.png"],"desc":"礼服 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er30","name":"Long Dress · Sandals","cat":"礼服","price":670,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er30","asset":"./assets/wardrobe_real/outfits/elyn/er30/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/10.png","./assets/wardrobe_original/clean_pieces/elyn/socks/01.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/11.png","./assets/wardrobe_original/clean_pieces/elyn/bags/11.png"],"desc":"礼服 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er31","name":"Sundress · Sport Shoes","cat":"情侣","price":365,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er31","asset":"./assets/wardrobe_real/outfits/elyn/er31/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/11.png","./assets/wardrobe_original/clean_pieces/elyn/socks/03.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/14.png","./assets/wardrobe_original/clean_pieces/elyn/bags/16.png"],"desc":"情侣 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er32","name":"Ribbon Dress · Combat Boots","cat":"情侣","price":400,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er32","asset":"./assets/wardrobe_real/outfits/elyn/er32/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/12.png","./assets/wardrobe_original/clean_pieces/elyn/socks/05.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/17.png","./assets/wardrobe_original/clean_pieces/elyn/bags/01.png"],"desc":"情侣 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er33","name":"Fairy Dress · Ribbon Heels","cat":"情侣","price":435,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er33","asset":"./assets/wardrobe_real/outfits/elyn/er33/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/13.png","./assets/wardrobe_original/clean_pieces/elyn/socks/07.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/20.png","./assets/wardrobe_original/clean_pieces/elyn/bags/06.png"],"desc":"情侣 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er34","name":"Velvet Dress · Chunky Sneakers","cat":"情侣","price":470,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er34","asset":"./assets/wardrobe_real/outfits/elyn/er34/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/14.png","./assets/wardrobe_original/clean_pieces/elyn/socks/09.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/03.png","./assets/wardrobe_original/clean_pieces/elyn/bags/11.png"],"desc":"情侣 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er35","name":"Cheongsam · Loafers","cat":"情侣","price":505,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er35","asset":"./assets/wardrobe_real/outfits/elyn/er35/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/dresses/15.png","./assets/wardrobe_original/clean_pieces/elyn/socks/11.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/06.png","./assets/wardrobe_original/clean_pieces/elyn/bags/16.png"],"desc":"情侣 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er36","name":"Off Shoulder + Ruffle Skirt","cat":"运动","price":240,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er36","asset":"./assets/wardrobe_real/outfits/elyn/er36/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/21.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/19.png","./assets/wardrobe_original/clean_pieces/elyn/socks/07.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/12.png","./assets/wardrobe_original/clean_pieces/elyn/bags/17.png"],"desc":"运动 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er37","name":"Corset Top + Leather Pants","cat":"运动","price":275,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er37","asset":"./assets/wardrobe_real/outfits/elyn/er37/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/24.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/17.png","./assets/wardrobe_original/clean_pieces/elyn/socks/08.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/08.png","./assets/wardrobe_original/clean_pieces/elyn/bags/18.png"],"desc":"运动 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er38","name":"Bow Top + Tiered Skirt","cat":"运动","price":310,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er38","asset":"./assets/wardrobe_real/outfits/elyn/er38/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/26.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/20.png","./assets/wardrobe_original/clean_pieces/elyn/socks/09.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/20.png","./assets/wardrobe_original/clean_pieces/elyn/bags/19.png"],"desc":"运动 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er39","name":"Turtleneck + Suit Pants","cat":"运动","price":345,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er39","asset":"./assets/wardrobe_real/outfits/elyn/er39/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/28.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/16.png","./assets/wardrobe_original/clean_pieces/elyn/socks/10.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/18.png","./assets/wardrobe_original/clean_pieces/elyn/bags/20.png"],"desc":"运动 · 原版 Elyn 衣橱 · 整套角色换装"},{"id":"er40","name":"Furry Jacket + Wide Leg Jeans","cat":"运动","price":380,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/elyn/er40","asset":"./assets/wardrobe_real/outfits/elyn/er40/idle.png","parts":["./assets/wardrobe_original/clean_pieces/elyn/tops/30.png","./assets/wardrobe_original/clean_pieces/elyn/bottoms/11.png","./assets/wardrobe_original/clean_pieces/elyn/socks/11.png","./assets/wardrobe_original/clean_pieces/elyn/shoes/17.png","./assets/wardrobe_original/clean_pieces/elyn/bags/01.png"],"desc":"运动 · 原版 Elyn 衣橱 · 整套角色换装"}],"shawn":[{"id":"sr01","name":"Black Hoodie + Black Cargo Pants","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr01","asset":"./assets/wardrobe_real/outfits/shawn/sr01/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/01.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/01.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/02.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/04.png"],"desc":"日常 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr02","name":"White Tee + Light Jeans","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr02","asset":"./assets/wardrobe_real/outfits/shawn/sr02/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/02.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/04.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/01.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/07.png"],"desc":"日常 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr03","name":"Graphic Sweatshirt + Dark Jeans","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr03","asset":"./assets/wardrobe_real/outfits/shawn/sr03/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/03.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/03.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/04.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/10.png"],"desc":"日常 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr04","name":"White Shirt + Black Straight Pants","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr04","asset":"./assets/wardrobe_real/outfits/shawn/sr04/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/04.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/05.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/03.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/13.png"],"desc":"日常 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr05","name":"Black Shirt + Cream Pants","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr05","asset":"./assets/wardrobe_real/outfits/shawn/sr05/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/05.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/06.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/06.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/16.png"],"desc":"日常 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr06","name":"V-Neck Knit + White Pants","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr06","asset":"./assets/wardrobe_real/outfits/shawn/sr06/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/06.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/09.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/07.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/19.png"],"desc":"日常 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr07","name":"Varsity Jacket + Ripped Jeans","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr07","asset":"./assets/wardrobe_real/outfits/shawn/sr07/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/07.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/10.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/08.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/02.png"],"desc":"日常 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr08","name":"Gray Hoodie + Light Cargo Pants","cat":"日常","price":0,"starter":true,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr08","asset":"./assets/wardrobe_real/outfits/shawn/sr08/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/08.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/02.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/05.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/05.png"],"desc":"日常 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr09","name":"Black Sweatshirt + Loose Black Pants","cat":"工作","price":465,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr09","asset":"./assets/wardrobe_real/outfits/shawn/sr09/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/09.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/08.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/09.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/08.png"],"desc":"工作 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr10","name":"White Hoodie + Black Shorts","cat":"工作","price":500,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr10","asset":"./assets/wardrobe_real/outfits/shawn/sr10/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/10.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/11.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/10.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/11.png"],"desc":"工作 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr11","name":"Denim Jacket + Gray Shorts","cat":"工作","price":355,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr11","asset":"./assets/wardrobe_real/outfits/shawn/sr11/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/11.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/12.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/13.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/14.png"],"desc":"工作 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr12","name":"Plaid Shirt + Beige Shorts","cat":"工作","price":390,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr12","asset":"./assets/wardrobe_real/outfits/shawn/sr12/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/12.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/13.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/14.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/17.png"],"desc":"工作 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr13","name":"Cream Cardigan + Athletic Shorts","cat":"工作","price":425,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr13","asset":"./assets/wardrobe_real/outfits/shawn/sr13/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/13.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/14.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/11.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/20.png"],"desc":"工作 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr14","name":"Black Turtleneck + White Star Shorts","cat":"休闲","price":380,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr14","asset":"./assets/wardrobe_real/outfits/shawn/sr14/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/14.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/15.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/12.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/03.png"],"desc":"休闲 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr15","name":"Layered Jacket + Plaid Pants","cat":"休闲","price":415,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr15","asset":"./assets/wardrobe_real/outfits/shawn/sr15/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/15.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/16.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/16.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/06.png"],"desc":"休闲 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr16","name":"Jersey 77 + Black Sweatpants","cat":"休闲","price":270,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr16","asset":"./assets/wardrobe_real/outfits/shawn/sr16/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/16.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/17.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/17.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/09.png"],"desc":"休闲 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr17","name":"Sleeveless Knit + Gray Sweatpants","cat":"休闲","price":305,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr17","asset":"./assets/wardrobe_real/outfits/shawn/sr17/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/17.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/18.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/15.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/12.png"],"desc":"休闲 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr18","name":"Chill Sweatshirt + Olive Cargo Joggers","cat":"休闲","price":340,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr18","asset":"./assets/wardrobe_real/outfits/shawn/sr18/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/18.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/19.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/07.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/15.png"],"desc":"休闲 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr19","name":"White Shirt + Tie + Blue Plaid Pants","cat":"休闲","price":375,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr19","asset":"./assets/wardrobe_real/outfits/shawn/sr19/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/19.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/20.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/18.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/18.png"],"desc":"休闲 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr20","name":"Long Coat + Black Straight Pants","cat":"休闲","price":410,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr20","asset":"./assets/wardrobe_real/outfits/shawn/sr20/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/20.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/05.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/20.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/01.png"],"desc":"休闲 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr21","name":"Black Hoodie + Black Shorts","cat":"睡衣","price":205,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr21","asset":"./assets/wardrobe_real/outfits/shawn/sr21/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/01.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/11.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/15.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/04.png"],"desc":"睡衣 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr22","name":"Graphic Sweatshirt + Athletic Shorts","cat":"睡衣","price":240,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr22","asset":"./assets/wardrobe_real/outfits/shawn/sr22/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/03.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/14.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/16.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/07.png"],"desc":"睡衣 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr23","name":"White Shirt + Black Cargo Pants","cat":"睡衣","price":275,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr23","asset":"./assets/wardrobe_real/outfits/shawn/sr23/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/04.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/01.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/13.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/10.png"],"desc":"睡衣 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr24","name":"Black Shirt + Light Jeans","cat":"睡衣","price":310,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr24","asset":"./assets/wardrobe_real/outfits/shawn/sr24/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/05.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/04.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/02.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/13.png"],"desc":"睡衣 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr25","name":"Denim Jacket + Gray Cargo Joggers","cat":"睡衣","price":345,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr25","asset":"./assets/wardrobe_real/outfits/shawn/sr25/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/11.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/07.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/09.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/16.png"],"desc":"睡衣 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr26","name":"Plaid Shirt + Ripped Jeans","cat":"礼服","price":530,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr26","asset":"./assets/wardrobe_real/outfits/shawn/sr26/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/12.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/10.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/14.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/19.png"],"desc":"礼服 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr27","name":"Cream Cardigan + Cream Pants","cat":"礼服","price":565,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr27","asset":"./assets/wardrobe_real/outfits/shawn/sr27/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/13.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/06.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/12.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/02.png"],"desc":"礼服 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr28","name":"Black Turtleneck + Loose Black Pants","cat":"礼服","price":600,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr28","asset":"./assets/wardrobe_real/outfits/shawn/sr28/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/14.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/08.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/11.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/05.png"],"desc":"礼服 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr29","name":"Layered Jacket + Olive Cargo Joggers","cat":"礼服","price":635,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr29","asset":"./assets/wardrobe_real/outfits/shawn/sr29/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/15.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/19.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/18.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/08.png"],"desc":"礼服 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr30","name":"Jersey 77 + Blue Plaid Pants","cat":"礼服","price":670,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr30","asset":"./assets/wardrobe_real/outfits/shawn/sr30/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/16.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/20.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/17.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/11.png"],"desc":"礼服 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr31","name":"Sleeveless Knit + Light Cargo Pants","cat":"情侣","price":365,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr31","asset":"./assets/wardrobe_real/outfits/shawn/sr31/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/17.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/02.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/05.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/14.png"],"desc":"情侣 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr32","name":"Chill Sweatshirt + White Pants","cat":"情侣","price":400,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr32","asset":"./assets/wardrobe_real/outfits/shawn/sr32/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/18.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/09.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/07.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/17.png"],"desc":"情侣 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr33","name":"White Shirt + Tie + Black Straight Pants","cat":"情侣","price":435,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr33","asset":"./assets/wardrobe_real/outfits/shawn/sr33/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/19.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/05.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/12.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/20.png"],"desc":"情侣 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr34","name":"Long Coat + Black Cargo Pants","cat":"情侣","price":470,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr34","asset":"./assets/wardrobe_real/outfits/shawn/sr34/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/20.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/01.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/20.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/03.png"],"desc":"情侣 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr35","name":"Varsity Jacket + Plaid Pants","cat":"情侣","price":505,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr35","asset":"./assets/wardrobe_real/outfits/shawn/sr35/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/07.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/16.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/06.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/06.png"],"desc":"情侣 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr36","name":"Gray Hoodie + Black Sweatpants","cat":"运动","price":240,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr36","asset":"./assets/wardrobe_real/outfits/shawn/sr36/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/08.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/17.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/08.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/09.png"],"desc":"运动 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr37","name":"Black Sweatshirt + Gray Sweatpants","cat":"运动","price":275,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr37","asset":"./assets/wardrobe_real/outfits/shawn/sr37/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/09.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/18.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/15.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/12.png"],"desc":"运动 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr38","name":"White Hoodie + Black Shorts","cat":"运动","price":310,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr38","asset":"./assets/wardrobe_real/outfits/shawn/sr38/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/10.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/11.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/13.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/15.png"],"desc":"运动 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr39","name":"V-Neck Knit + Gray Shorts","cat":"运动","price":345,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr39","asset":"./assets/wardrobe_real/outfits/shawn/sr39/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/06.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/12.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/01.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/18.png"],"desc":"运动 · 原版 Shawn 衣橱 · 整套角色换装"},{"id":"sr40","name":"White Tee + Dark Jeans","cat":"运动","price":380,"starter":false,"spriteBase":"./assets/wardrobe_real/outfits/shawn/sr40","asset":"./assets/wardrobe_real/outfits/shawn/sr40/idle.png","parts":["./assets/wardrobe_original/clean_pieces/shawn/tops/02.png","./assets/wardrobe_original/clean_pieces/shawn/bottoms/03.png","./assets/wardrobe_original/clean_pieces/shawn/shoes/04.png","./assets/wardrobe_original/clean_pieces/shawn/accessories/01.png"],"desc":"运动 · 原版 Shawn 衣橱 · 整套角色换装"}]};
const OUTFIT_CATS=['全部','日常','工作','休闲','睡衣','礼服','情侣','运动'];


const INGREDIENT_ART={"apples":"./assets/fridge/unique40/apples.png","avocado":"./assets/fridge/unique40/avocado.png","bacon":"./assets/fridge/unique40/bacon.png","beef":"./assets/fridge/unique40/beef.png","berryYogurt":"./assets/fridge/unique40/berryYogurt.png","blueberries":"./assets/fridge/unique40/blueberries.png","bread":"./assets/fridge/unique40/bread.png","broccoli":"./assets/fridge/unique40/broccoli.png","butter":"./assets/fridge/unique40/butter.png","carrots":"./assets/fridge/unique40/carrots.png","cheese":"./assets/fridge/unique40/cheese.png","chicken":"./assets/fridge/unique40/chicken.png","cocoa":"./assets/fridge/unique40/cocoa.png","coffeeBeans":"./assets/fridge/unique40/coffeeBeans.png","corn":"./assets/fridge/unique40/corn.png","cream":"./assets/fridge/unique40/cream.png","eggs":"./assets/fridge/unique40/eggs.png","flour":"./assets/fridge/unique40/flour.png","garlic":"./assets/fridge/unique40/garlic.png","grapes":"./assets/fridge/unique40/grapes.png","greenOnion":"./assets/fridge/unique40/greenOnion.png","kimchi":"./assets/fridge/unique40/kimchi.png","lemon":"./assets/fridge/unique40/lemon.png","lettuce":"./assets/fridge/unique40/lettuce.png","milk":"./assets/fridge/unique40/milk.png","mushrooms":"./assets/fridge/unique40/mushrooms.png","noodles":"./assets/fridge/unique40/noodles.png","oil":"./assets/fridge/unique40/oil.png","onions":"./assets/fridge/unique40/onions.png","orangeJuice":"./assets/fridge/unique40/orangeJuice.png","pasta":"./assets/fridge/unique40/pasta.png","plainYogurt":"./assets/fridge/unique40/plainYogurt.png","potatoes":"./assets/fridge/unique40/potatoes.png","rice":"./assets/fridge/unique40/rice.png","salmon":"./assets/fridge/unique40/salmon.png","sauces":"./assets/fridge/unique40/sauces.png","shrimp":"./assets/fridge/unique40/shrimp.png","strawberries":"./assets/fridge/unique40/strawberries.png","sugar":"./assets/fridge/unique40/sugar.png","tomatoes":"./assets/fridge/unique40/tomatoes.png"};
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
 apples:{label:"苹果",emoji:"🍎",cat:"水果"},
 avocado:{label:"牛油果",emoji:"🥑",cat:"蔬果"},
 bacon:{label:"培根",emoji:"🥓",cat:"肉类"},
 beef:{label:"牛肉",emoji:"🥩",cat:"肉类"},
 berryYogurt:{label:"莓果酸奶",emoji:"🥣",cat:"冷藏"},
 blueberries:{label:"蓝莓",emoji:"🫐",cat:"水果"},
 bread:{label:"面包",emoji:"🍞",cat:"储藏"},
 broccoli:{label:"西兰花",emoji:"🥦",cat:"蔬果"},
 butter:{label:"黄油",emoji:"🧈",cat:"冷藏"},
 carrots:{label:"胡萝卜",emoji:"🥕",cat:"蔬果"},
 cheese:{label:"芝士",emoji:"🧀",cat:"冷藏"},
 chicken:{label:"鸡肉",emoji:"🍗",cat:"肉类"},
 cocoa:{label:"可可粉",emoji:"🍫",cat:"储藏"},
 coffeeBeans:{label:"咖啡豆",emoji:"☕",cat:"储藏"},
 corn:{label:"玉米",emoji:"🌽",cat:"蔬果"},
 cream:{label:"鲜奶油",emoji:"🥛",cat:"冷藏"},
 eggs:{label:"鸡蛋",emoji:"🥚",cat:"冷藏"},
 flour:{label:"面粉",emoji:"🌾",cat:"储藏"},
 garlic:{label:"大蒜",emoji:"🧄",cat:"蔬果"},
 grapes:{label:"葡萄",emoji:"🍇",cat:"水果"},
 greenOnion:{label:"葱",emoji:"🌿",cat:"蔬果"},
 kimchi:{label:"泡菜",emoji:"🥬",cat:"冷藏"},
 lemon:{label:"柠檬",emoji:"🍋",cat:"水果"},
 lettuce:{label:"生菜",emoji:"🥬",cat:"蔬果"},
 milk:{label:"牛奶",emoji:"🥛",cat:"冷藏"},
 mushrooms:{label:"蘑菇",emoji:"🍄",cat:"蔬果"},
 noodles:{label:"面条",emoji:"🍜",cat:"储藏"},
 oil:{label:"食用油",emoji:"🫗",cat:"调味"},
 onions:{label:"洋葱",emoji:"🧅",cat:"蔬果"},
 orangeJuice:{label:"橙汁",emoji:"🧃",cat:"饮料"},
 pasta:{label:"意面",emoji:"🍝",cat:"储藏"},
 plainYogurt:{label:"原味酸奶",emoji:"🥣",cat:"冷藏"},
 potatoes:{label:"马铃薯",emoji:"🥔",cat:"蔬果"},
 rice:{label:"米饭",emoji:"🍚",cat:"储藏"},
 salmon:{label:"三文鱼",emoji:"🐟",cat:"海鲜"},
 sauces:{label:"酱料",emoji:"🫙",cat:"调味"},
 shrimp:{label:"虾",emoji:"🦐",cat:"海鲜"},
 strawberries:{label:"草莓",emoji:"🍓",cat:"水果"},
 sugar:{label:"砂糖",emoji:"🧂",cat:"储藏"},
 tomatoes:{label:"番茄",emoji:"🍅",cat:"蔬果"}
};

const DEFAULT_FRIDGE_POSITIONS={};
Object.keys(INGREDIENTS).forEach((id,i)=>{
  const col=i%8,row=Math.floor(i/8);
  const xs=[8,20,32,44,56,68,80,92], ys=[13,30,47,64,81];
  DEFAULT_FRIDGE_POSITIONS[id]=[xs[col],ys[row]];
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

const RECIPE_ART={"aglioOlio":"./assets/food/recipes40/aglioOlio.jpg","avocadoToast":"./assets/food/recipes40/avocadoToast.jpg","bibimbap":"./assets/food/recipes40/bibimbap.jpg","breakfastPlate":"./assets/food/recipes40/breakfastPlate.jpg","brownies":"./assets/food/recipes40/brownies.jpg","carbonara":"./assets/food/recipes40/carbonara.jpg","chickenChop":"./assets/food/recipes40/chickenChop.jpg","chickenSoup":"./assets/food/recipes40/chickenSoup.jpg","chickenWings":"./assets/food/recipes40/chickenWings.jpg","coffee":"./assets/food/recipes40/coffee.jpg","cookies":"./assets/food/recipes40/cookies.jpg","cornSoup":"./assets/food/recipes40/cornSoup.jpg","creamPasta":"./assets/food/recipes40/creamPasta.jpg","crepes":"./assets/food/recipes40/crepes.jpg","cupcakes":"./assets/food/recipes40/cupcakes.jpg","curryRice":"./assets/food/recipes40/curryRice.jpg","eggSandwich":"./assets/food/recipes40/eggSandwich.jpg","frenchToast":"./assets/food/recipes40/frenchToast.jpg","friedRice":"./assets/food/recipes40/friedRice.jpg","fries":"./assets/food/recipes40/fries.jpg","grilledSalmon":"./assets/food/recipes40/grilledSalmon.jpg","hashBrowns":"./assets/food/recipes40/hashBrowns.jpg","hotChocolate":"./assets/food/recipes40/hotChocolate.jpg","kimchiFriedRice":"./assets/food/recipes40/kimchiFriedRice.jpg","latte":"./assets/food/recipes40/latte.jpg","macCheese":"./assets/food/recipes40/macCheese.jpg","mushroomRisotto":"./assets/food/recipes40/mushroomRisotto.jpg","mushroomSoup":"./assets/food/recipes40/mushroomSoup.jpg","nuggets":"./assets/food/recipes40/nuggets.jpg","omelette":"./assets/food/recipes40/omelette.jpg","pancakes":"./assets/food/recipes40/pancakes.jpg","ramen":"./assets/food/recipes40/ramen.jpg","scrambledEggs":"./assets/food/recipes40/scrambledEggs.jpg","strawberryCake":"./assets/food/recipes40/strawberryCake.jpg","strawberryMilk":"./assets/food/recipes40/strawberryMilk.jpg","teriyakiChicken":"./assets/food/recipes40/teriyakiChicken.jpg","tomatoEgg":"./assets/food/recipes40/tomatoEgg.jpg","tomatoPasta":"./assets/food/recipes40/tomatoPasta.jpg","tomatoSoup":"./assets/food/recipes40/tomatoSoup.jpg","udon":"./assets/food/recipes40/udon.jpg"};
Object.entries(RECIPE_ART).forEach(([id,img])=>{if(RECIPES[id])RECIPES[id].img=img});

const STEP_LABELS={
 crack:'敲鸡蛋 · 力度',chop:'切菜 · 手势',whisk:'打蛋 / 搅拌',stir:'搅拌',
 heat:'火候 · 熟度',season:'调味',plate:'摆盘',flip:'翻锅 Timing',pour:'倒入',
 dip:'浸泡',assemble:'组合',boil:'煮沸',airfry:'空气炸锅',shake:'中途 Shake',
 coat:'裹粉',knead:'揉面 / 塑形',oven:'烤箱',decorate:'装饰',
 grind:'磨咖啡豆',brew:'冲煮',steam:'打奶泡',blend:'搅拌机'
};

const DEFAULT_FRIDGE={
 apples:6,avocado:5,bacon:6,beef:6,berryYogurt:6,blueberries:6,bread:8,broccoli:6,butter:6,carrots:8,cheese:6,chicken:8,cocoa:8,coffeeBeans:10,corn:6,cream:5,eggs:12,flour:12,garlic:8,grapes:6,greenOnion:8,kimchi:6,lemon:6,lettuce:6,milk:8,mushrooms:8,noodles:10,oil:8,onions:8,orangeJuice:8,pasta:10,plainYogurt:6,potatoes:8,rice:10,salmon:6,sauces:8,shrimp:6,strawberries:8,sugar:10,tomatoes:8
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
if(state.fridgeLayoutVersion!==252){state.fridgePositions=Object.assign({},DEFAULT_FRIDGE_POSITIONS);state.fridgeLayoutVersion=252;}
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
state.outfits=Object.assign({shawn:'sr01',elyn:'er01'},state.outfits||{});
state.outfitFavorites=state.outfitFavorites||{shawn:[],elyn:[]};
state.ownedOutfits=state.ownedOutfits||{shawn:[],elyn:[]};
['shawn','elyn'].forEach(p=>{
 const starters=OUTFITS[p].filter(o=>o.starter).map(o=>o.id);
 state.ownedOutfits[p]=Array.from(new Set([...(state.ownedOutfits[p]||[]),...starters]));
 if(!OUTFITS[p].some(o=>o.id===state.outfits[p]))state.outfits[p]=starters[0];
 state.outfitFavorites[p]=(state.outfitFavorites[p]||[]).filter(id=>OUTFITS[p].some(o=>o.id===id));
});
state.fishInventory=state.fishInventory||{};
state.fishAlbum=Array.isArray(state.fishAlbum)?state.fishAlbum:[];
state.fishingStats=state.fishingStats||{casts:0,catches:0,escapes:0,bestKg:0};
state.premiumBait=Number.isFinite(state.premiumBait)?state.premiumBait:2;
state.customRecipeBook=Array.isArray(state.customRecipeBook)?state.customRecipeBook:[];
state.cars=state.cars||{
 black:{id:'black',name:'Black Lexus',plate:'W 8331 M',fuel:78,clean:72,condition:96,mileage:12831,last:'车库',model:'./assets/cars/lexus-black-W8331M.png'},
 white:{id:'white',name:'White Lexus',plate:'SLWR 0309',fuel:86,clean:81,condition:97,mileage:7039,last:'车库',model:'./assets/cars/lexus-white-SLWR0309.png'}
};
['black','white'].forEach(id=>{state.cars[id]=Object.assign({fuel:80,clean:80,condition:100,mileage:0,last:'车库'},state.cars[id]||{});state.cars[id].model=id==='black'?'./assets/cars/lexus-black-W8331M.png':'./assets/cars/lexus-white-SLWR0309.png'});
['black','white'].forEach(id=>{
 const car=state.cars[id];
 car.storage=car.storage||{boot:[],backSeat:[{type:'umbrella',label:'雨伞',qty:1}],glove:[{type:'tissues',label:'纸巾',qty:1},{type:'charger',label:'充电线',qty:1},{type:'parkingCard',label:'停车卡',qty:1}],cups:[]};
 car.interior=Object.assign({ac:true,music:'Cozy FM',windows:0,light:false,phoneHolder:true},car.interior||{});
 car.stats=Object.assign({trips:0,bestScore:0,perfectParks:0,collisions:0,redStops:0},car.stats||{});
 car.custom=Object.assign({interior:'原厂',wheel:'原厂',hanging:'无',led:false,airFreshener:'棉花香'},car.custom||{});
});
state.carSettings=Object.assign({camera:'third',difficulty:'normal'},state.carSettings||{});
state.racing=Object.assign({difficulty:'normal',bestTimes:{},wins:0,races:0},state.racing||{});
state.racing.bestTimes=state.racing.bestTimes||{};

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

const OUTING_DESTINATIONS={
 supermarket:{name:'Supermarket 超市',icon:'🛒',x:22,y:56,preview:'./assets/outing/supermarket.jpg',desc:'买食材、饮料和日用品',route:'supermarket'},
 gym:{name:'Gym 健身房',icon:'🏋️',x:83,y:37,preview:'./assets/outing/gym.jpg',desc:'跑步机、重量训练、单车',route:'gym'},
 park:{name:'Park 公园',icon:'🌳',x:46,y:38,preview:'./assets/outing/park.jpg',desc:'散步、遛 Dudu、野餐和拍照',route:'park'},
 cinema:{name:'Cinema 电影院',icon:'🎬',x:18,y:35,preview:'./assets/outing/cinema.jpg',desc:'选电影、爆米花、情侣约会',route:'cinema'},
 ski:{name:'Ski Resort 滑雪场',icon:'❄️',x:23,y:18,preview:'./assets/outing/ski.jpg',desc:'雪地、滑雪小游戏和冬装',route:'ski'},
 amusement:{name:'Amusement Park 游乐园',icon:'🎡',x:79,y:22,preview:'./assets/outing/amusement.jpg',desc:'摩天轮、过山车和小游戏',route:'amusement'},
 restaurant:{name:'Restaurant 餐厅',icon:'🍽️',x:58,y:48,preview:'./assets/outing/restaurant.jpg',desc:'点餐、一起吃饭、恢复饥饿',route:'restaurant'},
 cafe:{name:'Café',icon:'☕',x:83,y:58,preview:'./assets/outing/cafe.jpg',desc:'甜品、饮料、聊天约会',route:'cafe'},
 mall:{name:'Shopping Mall 商场',icon:'🛍️',x:23,y:83,preview:'./assets/outing/mall.jpg',desc:'逛街、买礼物和服装',route:'mall'},
 convenience:{name:'Convenience Store 便利店',icon:'🏪',x:78,y:87,preview:'./assets/outing/convenience.jpg',desc:'快速补给、零食和饮料',route:'convenience'}
};
function save(){localStorage.setItem('worldRebuild1',JSON.stringify(state))}
function ensureQuickAccess(){
 const game=$('#gameScreen');if(!game)return;let dock=$('#quickAccessDock');
 if(!dock){dock=document.createElement('div');dock.id='quickAccessDock';dock.className='quick-access-dock';game.appendChild(dock)}
 const context=state.room==='lake'?`<button id="quickFishBtn">🎣 钓鱼</button>`:state.room==='kitchen'?`<button id="quickCustomCookBtn">✨ 自定义煮菜</button>`:state.room==='closet'?`<button id="quickWardrobeBtn">👗 衣橱</button>`:'';
 dock.innerHTML=`<button id="quickTaskBtn">📖 任务</button>${context}`;
 $('#quickTaskBtn').onclick=()=>openTaskHandbook('daily');
 if($('#quickFishBtn'))$('#quickFishBtn').onclick=openFishingGame;
 if($('#quickCustomCookBtn'))$('#quickCustomCookBtn').onclick=openCustomCooking;
 if($('#quickWardrobeBtn'))$('#quickWardrobeBtn').onclick=openWardrobe;
}
function showGame(){ $('#titleScreen').classList.add('hidden');$('#mapScreen').classList.add('hidden');$('#gameScreen').classList.remove('hidden');applyNeedsElapsed();renderNeedsUI();enterRoom(state.room||'living',false);renderOutfitSprites();renderCoopStatus();ensureQuickAccess();ensureAudio();startPetAI();updateMusicButton()}
function buildTabs(){const r=$('#roomTabs');r.innerHTML='';ROOM_ORDER.forEach(id=>{const b=document.createElement('button');b.textContent=ROOMS[id].label;b.onclick=()=>enterRoom(id);b.dataset.room=id;r.appendChild(b)})}
function enterRoom(id,doSave=true){state.room=id;if(doSave)netSend({type:'room',roomId:id});if(id==='lake')setTimeout(()=>recordEvent('visitLake',1),20); const room=ROOMS[id]; scene.style.backgroundImage=`url('./assets/scenes/${room.bg}')`; document.querySelectorAll('#roomTabs button').forEach(b=>b.classList.toggle('active',b.dataset.room===id)); const p=state.positions[id]||{}; setPos('elyn',p.elyn||room.spawn);setPos('shawn',p.shawn||room.partner);setPos('dudu',room.dudu);setPos('bubu',room.bubu); renderHotspots(); ensureQuickAccess(); say(activeName(),`来到${room.label}啦 ♡`); renderNeedsUI();if(doSave)save()}
function setPos(id,p){const el=$('#'+id);el.style.left=p[0]+'%';el.style.top=p[1]+'%';if(id==='elyn'||id==='shawn'){state.positions[state.room]=state.positions[state.room]||{};state.positions[state.room][id]=[...p];}}
function getPos(id){const e=$('#'+id);return [parseFloat(e.style.left)||50,parseFloat(e.style.top)||75]}
function actorEl(){return $('#'+state.active)}
function activeName(){return state.active==='elyn'?'Elyn':'Shawn'}
function partnerName(){return state.active==='elyn'?'Shawn':'Elyn'}
function renderHotspots(){const root=$('#interactionLayer');root.innerHTML='';ROOMS[state.room].hotspots.forEach(h=>{const b=document.createElement('button');b.className='hotspot'+(h.objectHit?' object-hit':'');b.style.left=h.x+'%';b.style.top=h.y+'%';if(h.w)b.style.width=h.w+'%';if(h.h)b.style.height=h.h+'%';b.textContent=h.objectHit?'':h.label;b.setAttribute('aria-label',h.label);b.onclick=e=>{e.stopPropagation();interact(h.action)};root.appendChild(b)})}
function say(name,text){$('#dialogName').textContent=name;$('#dialogText').textContent=text}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),1700)}
function switchActor(){if(state.playMode==='localCoop'){toast('本机双人：Elyn=WASD · Shawn=方向键');return}if(state.playMode==='room'&&state.netRole){toast('同步房间中你控制 '+(state.netRole==='elyn'?'Elyn':'Shawn'));return}state.active=state.active==='elyn'?'shawn':'elyn';recordEvent('switchCharacter',1);document.querySelectorAll('.actor').forEach(e=>e.classList.toggle('active',e.id===state.active));document.querySelectorAll('.status-card').forEach((e,i)=>e.classList.toggle('active',(i===0&&state.active==='shawn')||(i===1&&state.active==='elyn')));say(activeName(),'换我来 ♡');renderNeedsUI();save()}
function moveTo(x,y){x=Math.max(14,Math.min(88,x));y=Math.max(32,Math.min(86,y));const id=state.active, el=$('#'+id), from=getPos(id);const dx=x-from[0],dy=y-from[1];let dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');setHumanSprite(id,dir);moving[id]=true; const d=$('#destination');d.style.left=x+'%';d.style.top=y+'%';d.style.opacity=1; const start=performance.now(),dur=Math.min(1300,Math.max(250,Math.hypot(dx,dy)*35)); function step(now){let t=Math.min(1,(now-start)/dur);let ease=1-Math.pow(1-t,3);setPos(id,[from[0]+dx*ease,from[1]+dy*ease]);if(t<1)requestAnimationFrame(step);else{moving[id]=false;setHumanSprite(id,'idle');d.style.opacity=0;save()}} requestAnimationFrame(step)}
scene.addEventListener('click',e=>{if(e.target.closest('.hotspot'))return;const r=scene.getBoundingClientRect();moveTo((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100)});
function moveKeyboardActor(id,dt,left,right,up,down){
 let p=getPos(id),speed=20*dt,dir=null;if(left){p[0]-=speed;dir='left'}if(right){p[0]+=speed;dir='right'}if(up){p[1]-=speed;dir='up'}if(down){p[1]+=speed;dir='down'}
 const img=$('#'+id)?.querySelector('.base-sprite');if(dir){p[0]=Math.max(14,Math.min(88,p[0]));p[1]=Math.max(32,Math.min(86,p[1]));setPos(id,p);if(img)setHumanSprite(id,dir);if(state.playMode==='room'&&state.netRole===id&&performance.now()-netLastMove>70){netLastMove=performance.now();netSend({type:'move',actor:id,pos:p,dir})}}else if(img)setHumanSprite(id,'idle')
}
function keyboardLoop(ts){if(!last)last=ts;const dt=Math.min(.04,(ts-last)/1000);last=ts;const typing=document.activeElement===$('#chatInput')||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);if(!typing){if(state.playMode==='localCoop'){moveKeyboardActor('elyn',dt,keys.a,keys.d,keys.w,keys.s);moveKeyboardActor('shawn',dt,keys.ArrowLeft,keys.ArrowRight,keys.ArrowUp,keys.ArrowDown)}else if(state.playMode==='room'){const id=state.netRole||state.active;moveKeyboardActor(id,dt,keys.ArrowLeft||keys.a,keys.ArrowRight||keys.d,keys.ArrowUp||keys.w,keys.ArrowDown||keys.s)}else moveKeyboardActor(state.active,dt,keys.ArrowLeft||keys.a,keys.ArrowRight||keys.d,keys.ArrowUp||keys.w,keys.ArrowDown||keys.s)}raf=requestAnimationFrame(keyboardLoop)}

window.addEventListener('keydown',e=>{if(e.key==='Enter'){if(document.activeElement===$('#chatInput')){e.preventDefault();sendTypedChat();return}if(!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){e.preventDefault();$('#chatInput')?.focus();return}}if(e.key==='Escape'&&document.activeElement===$('#chatInput')){$('#chatInput').blur();return}if(document.activeElement===$('#chatInput'))return;keys[e.key]=true;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault()});window.addEventListener('keyup',e=>{keys[e.key]=false;save()});
function openMap(){save();$('#gameScreen').classList.add('hidden');$('#mapScreen').classList.remove('hidden');renderMapHud()}
function buildMap(){const root=$('#mapPins');root.innerHTML='';ROOM_ORDER.forEach(id=>{const [x,y]=MAP_POS[id],b=document.createElement('button');b.style.left=x+'%';b.style.top=y+'%';b.setAttribute('aria-label','进入'+ROOMS[id].label);b.title='进入'+ROOMS[id].label;b.onclick=()=>{state.room=id;showGame()};root.appendChild(b)})}
function closeOuting(){document.querySelector('.outing-overlay')?.remove()}
function openOutingMap(selected='supermarket'){
 closeOuting();
 const d=OUTING_DESTINATIONS[selected]||OUTING_DESTINATIONS.supermarket;
 const el=document.createElement('section');el.className='outing-overlay';el.innerHTML=`
  <div class="outing-shell">
   <header class="outing-header"><div><b>出去玩 · Go Out</b><span>选择地图目的地 · 之后可以直接接 Lexus 驾驶</span></div><button id="outingClose">✕</button></header>
   <div class="outing-layout">
    <div class="outing-map"><img src="./assets/outing/city-map.jpg" alt="outing map">${Object.entries(OUTING_DESTINATIONS).map(([id,o])=>`<button class="outing-pin ${id===selected?'active':''}" data-outing-pin="${id}" style="left:${o.x}%;top:${o.y}%" title="${o.name}"><span>${o.icon}</span></button>`).join('')}</div>
    <aside class="outing-detail"><img id="outingPreview" src="${d.preview}"><div><span id="outingIcon">${d.icon}</span><h2 id="outingName">${d.name}</h2><p id="outingDesc">${d.desc}</p></div><button class="small-button" id="outingEnter">进入地点</button><button class="small-button secondary" id="outingDrive">🚗 开车前往</button></aside>
   </div>
   <div class="outing-dest-strip">${Object.entries(OUTING_DESTINATIONS).map(([id,o])=>`<button data-outing-card="${id}" class="${id===selected?'active':''}"><img src="${o.preview}"><b>${o.icon} ${o.name}</b></button>`).join('')}</div>
  </div>`;document.body.appendChild(el);
 let current=selected;
 const select=id=>{current=id;const o=OUTING_DESTINATIONS[id];document.querySelectorAll('[data-outing-pin]').forEach(b=>b.classList.toggle('active',b.dataset.outingPin===id));document.querySelectorAll('[data-outing-card]').forEach(b=>b.classList.toggle('active',b.dataset.outingCard===id));$('#outingPreview').src=o.preview;$('#outingIcon').textContent=o.icon;$('#outingName').textContent=o.name;$('#outingDesc').textContent=o.desc};
 document.querySelectorAll('[data-outing-pin]').forEach(b=>b.onclick=()=>select(b.dataset.outingPin));document.querySelectorAll('[data-outing-card]').forEach(b=>b.onclick=()=>select(b.dataset.outingCard));
 $('#outingClose').onclick=closeOuting;$('#outingEnter').onclick=()=>openOutingLocation(current,false);$('#outingDrive').onclick=()=>chooseOutingCar(current);
}
function outingReward(coins=0,xp=0,love=0,msg='完成活动 ♡'){state.coins+=coins;state.xpTotal+=xp;if(love)addLove(love,'一起出游');save();renderTaskUI();renderNeedsUI();rewardPop(`${msg}${coins?` · +${coins}🪙`:''}${xp?` +${xp}XP`:''}`)}
function openOutingLocation(id,arrivedByCar=false){
 closeOuting();const o=OUTING_DESTINATIONS[id];if(!o)return;state.lastOuting=id;save();
 const actionSets={
  supermarket:[['🛒 买一篮食材 · 120 Coins','groceries'],['🥤 买饮料 · 25 Coins','drink']],
  gym:[['🏃 跑步机 10 分钟','treadmill'],['🏋️ 重量训练','weights'],['🚴 室内单车','cycle']],
  park:[['🐕 遛 Dudu','walkdog'],['🧺 野餐','picnic'],['📷 情侣拍照','photo']],
  cinema:[['🎟️ 买两张票 · 60 Coins','movie'],['🍿 爆米花 · 18 Coins','popcorn']],
  ski:[['⛷️ 开始滑雪 Timing','skigame'],['📷 雪地合照','snowphoto']],
  amusement:[['🎡 摩天轮 · 30 Coins','ferris'],['🎢 过山车 · 35 Coins','coaster'],['🎯 游戏摊位 · 15 Coins','booth']],
  restaurant:[['🍝 双人晚餐 · 70 Coins','dinner'],['🥗 简单套餐 · 38 Coins','meal']],
  cafe:[['☕ 双人 Café 约会 · 32 Coins','cafedate'],['🍰 甜品 · 20 Coins','dessert']],
  mall:[['🎁 买小礼物 · 45 Coins','gift'],['👗 打开服装商店','fashion']],
  convenience:[['🥪 快速补给 · 28 Coins','snack'],['🧃 买饮料 · 15 Coins','quickdrink']]
 };
 const actions=actionSets[id]||[];
 const el=document.createElement('section');el.className='outing-location-overlay';el.innerHTML=`<div class="outing-location"><button class="outing-back" id="outingLocBack">← 地图</button><div class="outing-location-hero"><img src="${o.preview}"><div><span>${o.icon}</span><h1>${o.name}</h1><p>${o.desc}</p>${arrivedByCar?'<b>🚗 已完成驾驶和停车，抵达目的地</b>':''}</div></div><div class="outing-actions">${actions.map(([label,a])=>`<button data-outing-action="${a}">${label}</button>`).join('')}</div></div>`;document.body.appendChild(el);$('#outingLocBack').onclick=()=>{el.remove();openOutingMap(id)};document.querySelectorAll('[data-outing-action]').forEach(b=>b.onclick=()=>runOutingAction(id,b.dataset.outingAction));
}
function spendCoins(n){if(state.coins<n){toast(`Coins 不够，需要 ${n}`);return false}state.coins-=n;return true}
function runOutingAction(place,a){const me=state.active,partner=me==='elyn'?'shawn':'elyn';
 if(a==='groceries'){if(!spendCoins(120))return;Object.entries(DEFAULT_FRIDGE).forEach(([id,n])=>state.fridge[id]=Math.max(state.fridge[id]||0,n));outingReward(0,35,2,'超市补货完成 · 40种食材都补齐了');return}
 if(a==='drink'||a==='quickdrink'){const cost=a==='drink'?25:15;if(!spendCoins(cost))return;adjustNeeds(me,{mood:+4,hunger:-3});outingReward(0,10,0,'买到饮料');return}
 if(['treadmill','weights','cycle'].includes(a)){adjustNeeds(me,{mood:+6,health:+4,hunger:+6,sleepiness:+4});outingReward(15,45,0,'完成健身');return}
 if(a==='walkdog'){adjustNeeds('dudu',{mood:+12,hunger:+4});adjustNeeds(me,{mood:+7});outingReward(10,30,2,'一起遛 Dudu');return}
 if(a==='picnic'){if(!spendCoins(20))return;adjustNeeds(me,{hunger:-18,mood:+8});adjustNeeds(partner,{hunger:-18,mood:+8});outingReward(0,25,5,'公园野餐 ♡');return}
 if(a==='photo'||a==='snowphoto'){outingReward(10,25,5,'拍下新的情侣照片 ♡');return}
 if(a==='movie'){if(!spendCoins(60))return;adjustNeeds(me,{mood:+12});adjustNeeds(partner,{mood:+12});outingReward(0,45,8,'看完电影 ♡');return}
 if(a==='popcorn'){if(!spendCoins(18))return;adjustNeeds(me,{hunger:-10,mood:+4});outingReward(0,8,0,'爆米花买好了');return}
 if(a==='skigame'){startSkiMiniGame();return}
 if(['ferris','coaster','booth'].includes(a)){const cost=a==='ferris'?30:a==='coaster'?35:15;if(!spendCoins(cost))return;outingReward(a==='booth'?20:0,35,a==='ferris'?7:4,a==='ferris'?'摩天轮约会 ♡':'游乐园活动完成');return}
 if(a==='dinner'||a==='meal'){const cost=a==='dinner'?70:38;if(!spendCoins(cost))return;adjustNeeds(me,{hunger:-40,mood:+9});if(a==='dinner'){adjustNeeds(partner,{hunger:-40,mood:+9});outingReward(0,40,8,'一起吃晚餐 ♡')}else outingReward(0,22,0,'吃完套餐');return}
 if(a==='cafedate'||a==='dessert'){const cost=a==='cafedate'?32:20;if(!spendCoins(cost))return;adjustNeeds(me,{mood:+8,hunger:-8});outingReward(0,25,a==='cafedate'?6:1,'Café 小约会 ♡');return}
 if(a==='gift'){if(!spendCoins(45))return;outingReward(0,20,7,'买了小礼物 ♡');return}
 if(a==='fashion'){document.querySelector('.outing-location-overlay')?.remove();openWardrobe();return}
 if(a==='snack'){if(!spendCoins(28))return;adjustNeeds(me,{hunger:-20,mood:+3});outingReward(0,12,0,'便利店补给完成');return}
}
function startSkiMiniGame(){const ov=document.querySelector('.outing-location-overlay');if(!ov)return;const box=document.createElement('div');box.className='ski-mini';box.innerHTML=`<div><h2>⛷️ Ski Timing</h2><p>游标进入粉色 Perfect 区时点击！</p><div class="ski-track"><i id="skiNeedle"></i><b></b></div><button id="skiStop">STOP</button></div>`;ov.appendChild(box);let pos=0,dir=1,alive=true,last=performance.now();const step=t=>{if(!alive)return;pos+=dir*(t-last)*.055;last=t;if(pos>100){pos=100;dir=-1}if(pos<0){pos=0;dir=1}$('#skiNeedle').style.left=pos+'%';requestAnimationFrame(step)};requestAnimationFrame(step);$('#skiStop').onclick=()=>{alive=false;const score=Math.max(0,100-Math.abs(pos-72)*4),grade=score>88?'PERFECT':score>65?'GOOD':'FALL 😂';box.innerHTML=`<div><h2>${grade}</h2><p>${Math.round(score)}/100</p><button id="skiAgain">再滑一次</button></div>`;if(score>88)outingReward(30,55,4,'滑雪 PERFECT');else outingReward(8,25,1,score>65?'滑雪成功':'摔进雪里了 😂');$('#skiAgain').onclick=()=>{box.remove();startSkiMiniGame()}}}
function chooseOutingCar(dest){closeOuting();modal('选择 Lexus 出发',`<div class="outing-car-choice"><button data-outing-car="black"><img src="${state.cars.black.model}"><b>Black Lexus</b><span>W 8331 M</span></button><button data-outing-car="white"><img src="${state.cars.white.model}"><b>White Lexus</b><span>SLWR 0309</span></button></div>`);document.querySelectorAll('[data-outing-car]').forEach(b=>b.onclick=()=>{const carId=b.dataset.outingCar;$('#modalRoot').innerHTML='';if(state.room!=='garage')enterRoom('garage');prepareCarTrip(carId,dest,state.active,true)})}
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
 if(action==='blackcar'){return approachCarAndOpen('black');}
 if(action==='whitecar'){return approachCarAndOpen('white');}
 if(action==='shower'||action==='groom')adjustNeeds(state.active,{cleanliness:+45,mood:+5,health:+2});if(action==='talk'||action==='sit'||action==='tv')adjustNeeds(state.active,{mood:+7});if(action==='talk')recordEvent('coupleTalk',1);const labels={sit:'坐下来休息 ♡',tv:'一起看电视',cook:'开始做饭',eat:'一起吃饭',shower:'去洗澡',groom:'洗漱',study:'一起学习',talk:'一起看风景',water:'给植物浇水'};if(action==='study')recordEvent('study',1);if(action==='water')recordEvent('waterPlants',1);
 say(name,labels[action]||'互动中 ♡');toast(labels[action]||'完成互动')}


function hasIngredients(required){return Object.entries(required).every(([id,n])=>(state.fridge[id]||0)>=n)}
function missingIngredients(required){return Object.entries(required).filter(([id,n])=>(state.fridge[id]||0)<n).map(([id,n])=>`${INGREDIENTS[id]?.label||id} ×${n-(state.fridge[id]||0)}`)}
function consumeIngredients(required){Object.entries(required).forEach(([id,n])=>state.fridge[id]=Math.max(0,(state.fridge[id]||0)-n))}
function recipeVisual(r,small=false){return `<div class="food-visual ${small?'small':''}">${r.img?`<img src="${r.img}" alt="${r.label||'料理'}" onerror="this.style.display='none';this.nextElementSibling&&(this.nextElementSibling.style.display='grid')">`:''}<span class="food-fallback-emoji" style="${r.img?'display:none':''}">${r.emoji||'🍽️'}</span></div>`}
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
 const allIds=Object.keys(INGREDIENTS);
 const coldIds=REFRIGERATED_IDS.filter(id=>INGREDIENTS[id]);
 const pantryIds=allIds.filter(id=>!REFRIGERATED_IDS.includes(id));
 const itemHtml=allIds.map(id=>{
  const it=INGREDIENTS[id],p=state.fridgePositions[id]||DEFAULT_FRIDGE_POSITIONS[id]||[50,50];
  return `<button class="real-fridge-item" data-id="${id}" data-cat="${it.cat}" style="left:${p[0]}%;top:${p[1]}%" title="${it.label}">
    ${ingredientVisual(id)}<small>${state.fridge[id]||0}</small></button>`;
 }).join('');
 kitchenOverlay(`
 <div class="real-fridge-shell approved-fridge-ui">
  <header class="fp-top fridge-approved-head">
   <div><span class="fp-kicker">FRIDGE · 40 UNIQUE INGREDIENTS</span><h1>冰箱 · Refrigerator</h1><p>40 种不同食材 · 每个食材独立图片 · 可查看、搜索和整理。</p></div>
   <div class="fridge-head-actions"><button class="mama-btn" id="toggleFridgeOrganize">🖐️ 整理食材</button><button class="mama-btn custom-cook-btn" id="goCookFromFridge">🍳 Recipe Book</button></div>
  </header>
  <div class="real-fridge-layout">
   <div class="real-fridge-stage">
    <img class="fridge-showcase-img" id="fridgeShowcaseImg" src="./assets/fridge/fridge-showcase-40.jpg" alt="40 unique ingredients fridge">
    <div class="real-fridge-board hidden" id="fridgeBoard">${itemHtml}</div>
   </div>
   <aside class="real-fridge-side">
    <input id="fridgeSearch2" class="fp-search" placeholder="搜索 40 种食材 / 鱼获…">
    <div class="fridge-tabs"><button class="active" data-fridge-tab="all">全部40种</button><button data-fridge-tab="cold">冷藏</button><button data-fridge-tab="pantry">储藏</button><button data-fridge-tab="fish">鱼获</button></div>
    <div id="fridgeInfo" class="fridge-info"><b>40 Unique Ingredients</b><p>默认展示模式跟参考图一样整齐；按“整理食材”可进入拖拽模式。</p></div>
    <div id="fridgeInventoryList" class="inventory-real-list"></div>
    <div class="fridge-actions"><button class="fp-action secondary" id="quickRestock">🛒 补货 · 80 coins</button><button class="fp-action" id="goCookFromFridge2">🍳 去料理台</button></div>
   </aside>
  </div>
  <div class="fridge-ingredient-strip">${allIds.map(id=>`<button data-fridge-strip="${id}" title="${INGREDIENTS[id].label}">${ingredientVisual(id)}<small>${INGREDIENTS[id].label}</small></button>`).join('')}</div>
 </div>`,'fridge-mode real-fridge-mode');
 let tab='all',drag=null,q='',organize=false;
 const listRoot=$('#fridgeInventoryList');
 const renderSide=()=>{
  let src=tab==='all'?allIds:tab==='cold'?coldIds:tab==='pantry'?pantryIds:[];
  if(tab!=='fish'){
   listRoot.innerHTML=src.filter(id=>!q||INGREDIENTS[id].label.includes(q)).map(id=>`<button class="inventory-real-row" data-pick="${id}">${ingredientVisual(id)}<span><b>${INGREDIENTS[id].label}</b><small>${INGREDIENTS[id].cat}</small></span><em>×${state.fridge[id]||0}</em></button>`).join('');
  }else{
   const caught=FISH_DATA.filter(f=>(state.fishInventory[f.id]?.count||0)>0 && (!q||f.name.includes(q)));
   listRoot.innerHTML=caught.length?caught.map(f=>`<button class="inventory-real-row fish-row" data-fish="${f.id}"><img src="${f.img}"><span><b>${f.name}</b><small style="color:${FISH_RARITY_COLORS[f.rarity]}">${f.rarity} · 最重 ${state.fishInventory[f.id].best.toFixed(2)}kg</small></span><em>×${state.fishInventory[f.id].count}</em></button>`).join(''):'<div class="empty-note">还没有鱼获。去湖边钓鱼吧 🎣</div>';
  }
  listRoot.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>showIngredient(b.dataset.pick));
  listRoot.querySelectorAll('[data-fish]').forEach(b=>{b.onclick=()=>{const f=FISH_DATA.find(x=>x.id===b.dataset.fish);$('#fridgeInfo').innerHTML=`<div class="fish-info-mini"><img src="${f.img}"><div><b>${f.name}</b><p>${f.rarity} · 可拿来做自定义料理</p></div></div>`}});
 };
 const showIngredient=id=>{const it=INGREDIENTS[id];$('#fridgeInfo').innerHTML=`<div class="selected-big">${ingredientVisual(id)}<div><b>${it.label}</b><p>${it.cat} · 库存 ${state.fridge[id]||0}</p></div></div>`};
 $('#fridgeSearch2').oninput=e=>{q=e.target.value.trim();renderSide();if(organize)document.querySelectorAll('.real-fridge-item').forEach(el=>el.style.opacity=(!q||INGREDIENTS[el.dataset.id].label.includes(q))?'1':'.13')};
 document.querySelectorAll('[data-fridge-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.fridgeTab;document.querySelectorAll('[data-fridge-tab]').forEach(x=>x.classList.toggle('active',x===b));renderSide()});
 document.querySelectorAll('[data-fridge-strip]').forEach(b=>b.onclick=()=>showIngredient(b.dataset.fridgeStrip));
 document.querySelectorAll('.real-fridge-item').forEach(el=>{
  el.onclick=()=>showIngredient(el.dataset.id);
  el.onpointerdown=e=>{if(!organize)return;showIngredient(el.dataset.id);const r=$('#fridgeBoard').getBoundingClientRect();drag={el,r};el.setPointerCapture?.(e.pointerId);e.preventDefault()};
  el.onpointermove=e=>{if(!organize||!drag||drag.el!==el)return;const r=drag.r;let x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;x=Math.max(5,Math.min(95,x));y=Math.max(7,Math.min(93,y));el.style.left=x+'%';el.style.top=y+'%';state.fridgePositions[el.dataset.id]=[+x.toFixed(1),+y.toFixed(1)]};
  el.onpointerup=()=>{drag=null;save()};
 });
 $('#toggleFridgeOrganize').onclick=()=>{
  organize=!organize;
  $('#fridgeShowcaseImg').classList.toggle('hidden',organize);
  $('#fridgeBoard').classList.toggle('hidden',!organize);
  $('#toggleFridgeOrganize').textContent=organize?'✨ 返回展示模式':'🖐️ 整理食材';
  $('#fridgeInfo').innerHTML=organize?'<b>整理模式</b><p>拖动 40 种食材改变摆放位置，位置会自动保存。</p>':'<b>展示模式</b><p>40 种不同食材以整齐满冰箱方式展示。</p>';
 };
 $('#quickRestock').onclick=()=>{if(state.coins<80){toast('Coins 不够');return}state.coins-=80;Object.entries(DEFAULT_FRIDGE).forEach(([id,n])=>state.fridge[id]=Math.max(state.fridge[id]||0,Math.ceil(n*.7)));save();toast('40种食材补货完成 ♡');renderSide()};
 $('#goCookFromFridge').onclick=openCookingLegacy;$('#goCookFromFridge2').onclick=openCookingLegacy;renderSide();
}
function openCookingLegacy(){
 const cats=['全部',...new Set(Object.values(RECIPES).map(r=>r.cat))];
 const recipeIds=Object.keys(RECIPES).filter(id=>id!=='__custom');
 let cat='全部',selectedId=recipeIds[0];
 kitchenOverlay(`
  <div class="approved-cooking-shell">
   <header class="approved-cooking-top">
    <div><span class="fp-kicker">RECIPE BOOK · 40 UNIQUE DISH PHOTOS</span><h1>今天想煮什么？</h1><p>每一道食谱使用自己的料理照片；选择食谱后在右边查看详细食材与步骤。</p></div>
    <button class="mama-btn custom-cook-hero" id="customCookHero">✨ 自定义煮菜</button>
   </header>
   <div class="approved-cooking-layout">
    <section class="approved-recipe-book">
     <div class="recipe-toolbar-top"><input id="recipeSearch" class="fp-search" placeholder="搜索食谱…"></div>
     <div class="fp-chips" id="recipeCats">${cats.map((c,i)=>`<button class="${i===0?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div>
     <div class="approved-recipe-grid" id="fpRecipeGrid"></div>
    </section>
    <section class="approved-fridge-preview">
     <div class="mini-panel-title"><span>🧊</span><div><b>Fridge</b><small>40 Unique Ingredients</small></div><button id="openRealFridgeFromCook">打开冰箱</button></div>
     <img src="./assets/fridge/fridge-showcase-40.jpg" alt="40 unique ingredients">
     <div class="cook-ingredient-strip">${Object.keys(INGREDIENTS).map(id=>`<span title="${INGREDIENTS[id].label}">${ingredientVisual(id)}</span>`).join('')}</div>
    </section>
    <aside class="approved-recipe-detail" id="recipeDetail"></aside>
   </div>
  </div>`,'recipe-mode approved-recipe-mode');
 const filtered=()=>{
  const q=$('#recipeSearch').value.trim().toLowerCase();
  return recipeIds.filter(id=>{const r=RECIPES[id];return(cat==='全部'||r.cat===cat)&&(!q||r.label.toLowerCase().includes(q))});
 };
 const renderDetail=()=>{
  const r=RECIPES[selectedId];if(!r)return;
  const miss=missingIngredients(r.ingredients),ok=!miss.length;
  const ingHtml=Object.entries(r.ingredients).map(([id,n])=>`<div class="detail-ing ${((state.fridge[id]||0)>=n)?'ok':'miss'}">${ingredientVisual(id)}<span><b>${INGREDIENTS[id]?.label||id}</b><small>${state.fridge[id]||0}/${n}</small></span></div>`).join('');
  $('#recipeDetail').innerHTML=`
   <div class="detail-hero">${recipeVisual(r)}<button class="detail-heart">♡</button></div>
   <h2>${r.label}</h2><p class="detail-desc">${r.cat} · ${r.difficulty} · ${r.steps.length} 个料理步骤</p>
   <div class="detail-stat-row"><span>👩‍🍳 ${r.difficulty}</span><span>⏱️ ${Math.max(10,r.steps.length*5)} min</span><span>${ok?'✅ 食材齐全':'⚠️ 缺食材'}</span></div>
   <div class="detail-tabs"><b>Ingredients</b><span>Cooking Steps</span></div>
   <div class="detail-ingredients">${ingHtml}</div>
   <div class="detail-steps">${r.steps.map((s,i)=>`<span><i>${i+1}</i>${STEP_LABELS[s]||s}</span>`).join('')}</div>
   <button class="start-recipe-btn ${ok?'':'disabled'}" id="startSelectedRecipe">🍳 ${ok?'Start Cooking':'缺：'+miss.slice(0,2).join('、')}</button>`;
  $('#startSelectedRecipe').onclick=()=>{if(!ok){toast('缺少食材：'+miss.join('、'));return}startCookingLegacy(selectedId)};
 };
 const render=()=>{
  const ids=filtered();if(ids.length&&!ids.includes(selectedId))selectedId=ids[0];
  $('#fpRecipeGrid').innerHTML=ids.map(id=>{const r=RECIPES[id],miss=missingIngredients(r.ingredients),ok=!miss.length;return `<button class="approved-recipe-card ${id===selectedId?'selected':''} ${ok?'':'locked'}" data-recipe="${id}">${recipeVisual(r)}<div><b>${r.label}</b><small>${r.cat} · ${r.difficulty}</small><em>${ok?'♡ 食材齐全':'缺 '+miss.length+' 种'}</em></div></button>`}).join('')||'<div class="empty-note">没有找到食谱。</div>';
  document.querySelectorAll('[data-recipe]').forEach(b=>b.onclick=()=>{selectedId=b.dataset.recipe;render();renderDetail()});
  renderDetail();
 };
 $('#customCookHero').onclick=openCustomCooking;
 $('#openRealFridgeFromCook').onclick=openFridgeLegacy;
 $('#recipeSearch').oninput=render;
 document.querySelectorAll('#recipeCats button').forEach(b=>b.onclick=()=>{cat=b.dataset.cat;document.querySelectorAll('#recipeCats button').forEach(x=>x.classList.toggle('active',x===b));render()});
 render();
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
// MASTER 2.6.2 SAFE CHARACTER MODE
// The old wardrobe_real sprite set is visually corrupted, so live actors MUST NOT read it.
// Keep wardrobe ownership/data intact, but temporarily render only clean flattened base characters.
const SAFE_CHARACTER_MODE_262=true;
function baseHumanSpriteSrc(person,dir='idle'){
 const safeDir=['idle','down','up','left','right','back'].includes(dir)?dir:'idle';
 return `./assets/sprites_clean_v262/${person}-${safeDir}.png?v=262`;
}
function humanSpriteSrc(person,dir='idle'){
 if(SAFE_CHARACTER_MODE_262)return baseHumanSpriteSrc(person,dir);
 const o=getOutfit(person,state.outfits[person]);
 return `${o.spriteBase}/${dir}.png`;
}
function setHumanSprite(person,dir='idle'){
 const img=$('#'+person)?.querySelector('.base-sprite');if(!img)return;
 const clean=baseHumanSpriteSrc(person,dir);
 img.onerror=()=>{img.onerror=null;img.src=baseHumanSpriteSrc(person,'idle')};
 img.src=clean;
}
function renderOutfitSprites(){['shawn','elyn'].forEach(p=>setHumanSprite(p,'idle'))}
function renderOutfitOverlays(){renderOutfitSprites()}
function outfitOwned(person,id){return (state.ownedOutfits[person]||[]).includes(id)}
function outfitPartsHtml(o){return `<div class="wardrobe-integrated-note">整套角色 Sprite 已经穿好这套衣服 · 不是运行时叠加衣服图层</div>`}
function buyOutfit(person,id){const o=getOutfit(person,id);if(outfitOwned(person,id)){toast('已经拥有这套 ♡');return true}if(state.coins<o.price){toast(`Coins 不够，需要 ${o.price}`);return false}state.coins-=o.price;state.ownedOutfits[person].push(id);save();renderTaskUI();rewardPop(`🛍️ 买到 ${o.name} · -${o.price} Coins`);recordEvent('buyOutfit',1);return true}
function openWardrobe(){
 let person=state.active,cat='全部',selected=state.outfits[person],q='',mode='closet';
 const filtered=()=>OUTFITS[person].filter(o=>(cat==='全部'||o.cat===cat)&&(!q||[o.name,o.cat,o.desc].join(' ').toLowerCase().includes(q.toLowerCase()))&&(mode==='shop'?!outfitOwned(person,o.id):outfitOwned(person,o.id)));
 const draw=()=>{
  const cur=getOutfit(person,selected),owned=outfitOwned(person,selected);
  modal('衣帽间 · 原版整套换装',`<div class="wardrobe-v4">
   <div class="wardrobe-v4-top"><div class="person-tabs"><button data-person="elyn" class="${person==='elyn'?'active':''}">Elyn · 40套</button><button data-person="shawn" class="${person==='shawn'?'active':''}">Shawn · 40套</button></div><div class="wardrobe-mode-tabs"><button data-mode="closet" class="${mode==='closet'?'active':''}">👗 我的衣橱</button><button data-mode="shop" class="${mode==='shop'?'active':''}">🛍️ 服装商店</button></div><div class="wardrobe-balance">🪙 ${state.coins}</div></div>
   <div class="wardrobe-baked-note">🛠 MASTER 2.6.2 人物修复模式：旧换装 PNG 暂时停用，先使用干净人物母版测试。衣橱数据与购买记录仍保留。</div><div class="wardrobe-v3-toolbar"><input id="outfitSearch" class="search" placeholder="搜索衣服…"><div class="wardrobe-cats">${OUTFIT_CATS.map(c=>`<button data-cat="${c}" class="${c===cat?'active':''}">${c}</button>`).join('')}</div></div>
   <div class="wardrobe-v3-body"><div class="wardrobe-v3-grid" id="wardrobeGrid"></div><aside class="wardrobe-v3-preview"><div class="fit-mirror"><img id="fitPreview" src="${baseHumanSpriteSrc(person,'idle')}"></div><h2 id="previewName">${cur.name}</h2><p id="outfitMeta">${cur.cat} · ${owned?'已拥有':'未购买'}</p><div id="outfitRealParts">${outfitPartsHtml(cur)}</div><button class="small-button" id="mainOutfitAction">${owned?'穿上这套':`购买 · ${cur.price} Coins`}</button><button class="small-button secondary" id="favOutfit">♡ 收藏</button></aside></div>
  </div>`);bind();
 };
 const grid=()=>{const r=$('#wardrobeGrid');if(!r)return;const rows=filtered();r.innerHTML=rows.length?rows.map(o=>{const owned=outfitOwned(person,o.id);return `<button class="fit-outfit-card realwear-card ${selected===o.id?'selected':''}" data-outfit="${o.id}"><div class="realwear-thumb"><img src="${baseHumanSpriteSrc(person,'idle')}">${!owned?`<span class="shop-price">🪙 ${o.price}</span>`:''}</div><b>${o.name}</b><span>${o.cat}</span><small>${owned?'✓ 已拥有':'商店限定'}</small></button>`}).join(''):`<div class="wardrobe-empty">${mode==='shop'?'这个分类已经买完了 ♡':'这个分类还没有拥有的衣服'}</div>`;r.querySelectorAll('[data-outfit]').forEach(b=>b.onclick=()=>select(b.dataset.outfit))};
 const select=id=>{selected=id;const o=getOutfit(person,id),owned=outfitOwned(person,id);document.querySelectorAll('.fit-outfit-card').forEach(x=>x.classList.toggle('selected',x.dataset.outfit===id));$('#fitPreview').onerror=()=>{$('#fitPreview').onerror=null;$('#fitPreview').src=baseHumanSpriteSrc(person,'idle')};$('#fitPreview').src=baseHumanSpriteSrc(person,'idle');$('#previewName').textContent=o.name;$('#outfitMeta').textContent=`${o.cat} · ${owned?'已拥有':`价格 ${o.price} Coins`}`;$('#outfitRealParts').innerHTML=outfitPartsHtml(o);$('#mainOutfitAction').textContent=owned?'穿上这套':`购买 · ${o.price} Coins`};
 const bind=()=>{
  document.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>{person=b.dataset.person;selected=state.outfits[person];cat='全部';q='';draw()});
  document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;cat='全部';q='';const list=OUTFITS[person].filter(o=>mode==='shop'?!outfitOwned(person,o.id):outfitOwned(person,o.id));selected=(list[0]||getOutfit(person,state.outfits[person])).id;draw()});
  document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{cat=b.dataset.cat;document.querySelectorAll('[data-cat]').forEach(x=>x.classList.toggle('active',x===b));grid()});
  $('#outfitSearch').oninput=e=>{q=e.target.value.trim();grid()};
  $('#mainOutfitAction').onclick=()=>{const o=getOutfit(person,selected);if(!outfitOwned(person,selected)){if(!buyOutfit(person,selected))return;draw();return}state.outfits[person]=selected;save();renderOutfitSprites();toast(`${person==='elyn'?'Elyn':'Shawn'} 换上了 ${o.name} ♡`)};
  $('#favOutfit').onclick=()=>{const l=state.outfitFavorites[person],i=l.indexOf(selected);if(i>=0)l.splice(i,1);else l.push(selected);save();toast(i>=0?'取消收藏':'已收藏 ♡')};grid();
 };draw();
}

function lakeWeather(){
 const opts=['晴天','晴天','多云','小雨','薄雾','阵雨'];const k=dateKey();return opts[hashString('lake-'+k)%opts.length];
}
function rarityWeights(baitType){
 let w=baitType==='premium'?{'普通':68,'优良':22,'稀有':7.5,'史诗':1.8,'传说':.65,'神话':.05}:{...FISH_RARITY_ODDS};
 const weather=lakeWeather();if(weather==='小雨'||weather==='阵雨'){w['普通']*=.93;w['稀有']*=1.35;w['史诗']*=1.25;w['传说']*=1.2}if(weather==='薄雾'){w['普通']*=.9;w['史诗']*=1.4;w['传说']*=1.35;w['神话']*=1.25}
 const sum=Object.values(w).reduce((a,b)=>a+b,0);Object.keys(w).forEach(k=>w[k]=w[k]/sum*100);return w;
}
function rollRarity(weights){let r=Math.random()*100,acc=0;for(const rarity of ['普通','优良','稀有','史诗','传说','神话']){acc+=weights[rarity];if(r<=acc)return rarity}return '普通'}
function fishForRarity(rarity){const pool=FISH_DATA.filter(f=>f.rarity===rarity);return pool[Math.floor(Math.random()*pool.length)]}
function fishWeight(f){return +(f.minKg+Math.random()*(f.maxKg-f.minKg)).toFixed(2)}
function fishingOverlay(inner){document.querySelector('.fishing-overlay')?.remove();const el=document.createElement('section');el.className='fishing-overlay';el.innerHTML=`<div class="fishing-bg"></div><div class="fishing-shade"></div><button class="fp-close" id="fishClose">✕</button>${inner}`;document.body.appendChild(el);$('#fishClose').onclick=()=>el.remove();return el}
function openFishingGame(){
 state.weather=lakeWeather();const odds=rarityWeights('normal');
 fishingOverlay(`<div class="fishing-home"><header><span>湖边钓鱼</span><h1>今天的湖：${state.weather}</h1><p>共有 <b>80 种鱼</b>。每一种都有独立外观、重量和游戏稀有度。</p></header><div class="fishing-home-grid"><section class="fish-start-card"><h2>选择鱼饵</h2><button class="bait-card active" data-bait="normal"><b>普通鱼饵</b><span>库存 ${state.bait}</span><small>神话约 ${odds['神话'].toFixed(3)}%</small></button><button class="bait-card" data-bait="premium"><b>高级鱼饵</b><span>库存 ${state.premiumBait}</span><small>提高稀有以上几率</small></button><button class="mama-btn" id="startCast">开始抛竿</button></section><section class="rarity-board">${['普通','优良','稀有','史诗','传说','神话'].map(r=>`<div><i style="background:${FISH_RARITY_COLORS[r]}"></i><b>${r}</b><span>${rarityWeights('normal')[r].toFixed(r==='神话'?3:r==='传说'?2:1)}%</span></div>`).join('')}<small>普通鱼饵基础概率；天气和高级鱼饵会微调。神话依然非常低。</small></section><section class="fish-menu"><button class="card" id="fishAlbumBtn">📖 鱼类图鉴 · ${state.fishAlbum.length}/80</button><button class="card" id="fishBagBtn">🧺 我的鱼获</button><button class="card" id="buyPremium">🪱 买高级鱼饵 +2 · 100 coins</button></section></div></div>`);
 let baitType='normal';document.querySelectorAll('[data-bait]').forEach(b=>b.onclick=()=>{baitType=b.dataset.bait;document.querySelectorAll('[data-bait]').forEach(x=>x.classList.toggle('active',x===b))});
 $('#startCast').onclick=()=>{if(baitType==='normal'&&state.bait<=0){toast('普通鱼饵用完了');return}if(baitType==='premium'&&state.premiumBait<=0){toast('高级鱼饵用完了');return}if(baitType==='normal')state.bait--;else state.premiumBait--;save();startCastPower(baitType)};$('#fishAlbumBtn').onclick=openFishAlbum;$('#fishBagBtn').onclick=openFishInventory;$('#buyPremium').onclick=()=>{if(state.coins<100){toast('Coins 不够');return}state.coins-=100;state.premiumBait+=2;save();toast('买了 2 份高级鱼饵');openFishingGame()};
}
function startCastPower(baitType){
 fishingOverlay(`<div class="cast-game"><h1>🎣 抛竿</h1><p>按住蓄力，停在绿色区域。</p><div class="cast-meter"><i id="castPower"></i><em></em></div><b id="castPct">0%</b><button class="mama-btn hold" id="castHold">按住蓄力</button></div>`);let p=0,hold=false,raf;const loop=()=>{if(!hold)return;p=Math.min(100,p+1.2);$('#castPower').style.width=p+'%';$('#castPct').textContent=Math.round(p)+'%';raf=requestAnimationFrame(loop)};const stop=()=>{if(!hold)return;hold=false;cancelAnimationFrame(raf);const castScore=Math.max(20,100-Math.abs(p-72)*2.1);state.fishingStats.casts++;save();waitForBite(baitType,castScore)};$('#castHold').onpointerdown=e=>{hold=true;$('#castHold').setPointerCapture?.(e.pointerId);loop()};$('#castHold').onpointerup=stop;$('#castHold').onpointercancel=stop;
}
function waitForBite(baitType,castScore){
 fishingOverlay(`<div class="bite-wait"><div class="bobber" id="bobber">◉</div><h1 id="biteTitle">等待鱼咬钩…</h1><p>出现“咬钩！”时要快速点击。</p><button class="hook-btn" id="hookBtn" disabled>收线！</button></div>`);const delay=900+Math.random()*1800;let live=false;setTimeout(()=>{if(!document.querySelector('.fishing-overlay'))return;live=true;$('#biteTitle').textContent='！！咬钩！！';$('#bobber').classList.add('bite');$('#hookBtn').disabled=false;const windowMs=650+castScore*3;setTimeout(()=>{if(live){live=false;state.fishingStats.escapes++;save();$('#biteTitle').textContent='太慢了，鱼跑掉了…';$('#hookBtn').disabled=true;setTimeout(openFishingGame,900)}},windowMs)},delay);$('#hookBtn').onclick=()=>{if(!live)return;live=false;const rarity=rollRarity(rarityWeights(baitType)),fish=fishForRarity(rarity);startReelFight(fish,castScore)};
}
function startReelFight(fish,castScore){
 const rarityIndex=['普通','优良','稀有','史诗','传说','神话'].indexOf(fish.rarity),difficulty=1+rarityIndex*.55;fishingOverlay(`<div class="reel-game"><header><span style="color:${FISH_RARITY_COLORS[fish.rarity]}">${fish.rarity}</span><h1>有东西上钩了！</h1><p>按住“收线”。拉太紧会断线，太松鱼会逃。</p></header><div class="reel-water"><div class="fish-shadow" id="fishShadow">≈</div><div class="line-tension" id="lineTension"><i></i><em></em></div><div class="reel-progress"><i id="reelProg"></i></div></div><button class="mama-btn hold big-reel" id="reelHold">按住收线</button><div class="reel-stats"><span>拉力 <b id="tensionTxt">45</b></span><span>收线 <b id="progressTxt">0%</b></span></div></div>`);let tension=45,progress=0,hold=false,alive=true,lowTime=0,last=performance.now(),fishForce=0;$('#reelHold').onpointerdown=e=>{hold=true;$('#reelHold').setPointerCapture?.(e.pointerId)};$('#reelHold').onpointerup=()=>hold=false;$('#reelHold').onpointercancel=()=>hold=false;const tick=now=>{if(!alive)return;const dt=Math.min(.05,(now-last)/1000);last=now;fishForce=Math.sin(now/350*difficulty)*5*difficulty+(Math.random()-.5)*5*difficulty;tension+=dt*(hold?(31+rarityIndex*3):-24)+fishForce*dt;tension=Math.max(0,Math.min(105,tension));const safe=tension>=27&&tension<=78;if(hold&&safe)progress+=dt*(13+castScore*.06)/(1+rarityIndex*.14);if(!safe)progress-=dt*2.5;progress=Math.max(0,Math.min(100,progress));if(tension<10)lowTime+=dt;else lowTime=Math.max(0,lowTime-dt*.5);$('#lineTension i').style.width=Math.min(100,tension)+'%';$('#tensionTxt').textContent=Math.round(tension);$('#reelProg').style.width=progress+'%';$('#progressTxt').textContent=Math.round(progress)+'%';$('#fishShadow').style.transform=`translateX(${Math.sin(now/280*difficulty)*120}px) rotate(${fishForce*2}deg)`;if(tension>97){alive=false;state.fishingStats.escapes++;save();return fishingFail('线断了！这条鱼力量太大…')}if(lowTime>1.5){alive=false;state.fishingStats.escapes++;save();return fishingFail('拉力太低，鱼挣脱了…')}if(progress>=100){alive=false;return catchFish(fish)}requestAnimationFrame(tick)};requestAnimationFrame(tick);
}
function fishingFail(msg){$('.reel-game').innerHTML=`<div class="fish-fail"><h1>💦 跑掉了</h1><p>${msg}</p><button class="mama-btn" id="fishRetry">再试一次</button></div>`;$('#fishRetry').onclick=openFishingGame}
function catchFish(fish){
 const kg=fishWeight(fish);state.fishingStats.catches++;state.fishingStats.bestKg=Math.max(state.fishingStats.bestKg,kg);if(!state.fishInventory[fish.id])state.fishInventory[fish.id]={count:0,best:0};state.fishInventory[fish.id].count++;state.fishInventory[fish.id].best=Math.max(state.fishInventory[fish.id].best,kg);if(!state.fishAlbum.includes(fish.id))state.fishAlbum.push(fish.id);recordEvent('fish',1);if(['稀有','史诗','传说','神话'].includes(fish.rarity))recordEvent('rareFish',1);save();fishingOverlay(`<div class="catch-result"><span class="rarity-pill" style="--rarity:${FISH_RARITY_COLORS[fish.rarity]}">${fish.rarity}</span><img src="${fish.img}"><h1>${fish.name}</h1><div class="fish-weight">${kg.toFixed(2)} kg</div><p>${fish.habitat} · 图鉴 ${state.fishAlbum.length}/80</p><div class="result-actions"><button class="mama-btn secondary" id="keepFish">放进鱼获</button><button class="mama-btn" id="cookFish">拿去厨房自定义料理</button></div></div>`);$('#keepFish').onclick=openFishingGame;$('#cookFish').onclick=openCustomCooking;
}
function openFishAlbum(){
 const rarityOrder=['神话','传说','史诗','稀有','优良','普通'];fishingOverlay(`<div class="fish-album-shell"><header><h1>80 种鱼图鉴</h1><p>神话只有 1 种；普通鱼饵基础神话类别概率 <b>0.020%</b>。</p></header><div class="fish-album-grid">${[...FISH_DATA].sort((a,b)=>rarityOrder.indexOf(a.rarity)-rarityOrder.indexOf(b.rarity)).map(f=>{const got=state.fishAlbum.includes(f.id);return `<div class="fish-album-card ${got?'':'unknown'}" style="--rarity:${FISH_RARITY_COLORS[f.rarity]}"><img src="${f.img}"><b>${got?f.name:'???'}</b><span>${f.rarity}</span><small>${got?`${f.habitat} · ${state.fishInventory[f.id]?.best?.toFixed(2)||'--'}kg`:'尚未发现'}</small></div>`}).join('')}</div><button class="mama-btn album-back" id="albumBack">返回钓鱼</button></div>`);$('#albumBack').onclick=openFishingGame;
}
function openFishInventory(){
 const caught=FISH_DATA.filter(f=>(state.fishInventory[f.id]?.count||0)>0);fishingOverlay(`<div class="fish-album-shell"><header><h1>我的鱼获</h1><p>${caught.reduce((n,f)=>n+state.fishInventory[f.id].count,0)} 条鱼，可以拿去厨房做自定义料理。</p></header><div class="fish-album-grid">${caught.map(f=>`<div class="fish-album-card" style="--rarity:${FISH_RARITY_COLORS[f.rarity]}"><img src="${f.img}"><b>${f.name}</b><span>${f.rarity} ×${state.fishInventory[f.id].count}</span><small>最佳 ${state.fishInventory[f.id].best.toFixed(2)}kg</small></div>`).join('')}</div><button class="mama-btn album-back" id="fishCookAll">去自定义煮菜</button><button class="mama-btn secondary album-back" id="fishBagBack">返回</button></div>`);$('#fishCookAll').onclick=openCustomCooking;$('#fishBagBack').onclick=openFishingGame;
}



/* ==========================================================
   CAR GAMEPLAY 1.0 — DRIVING / PARKING / INTERIOR / COUPLE
   Focused upgrade. All non-car systems stay untouched.
   ========================================================== */
const CAR_ROUTES={
 lake:{name:'湖边山路',km:8,difficulty:'HARD',parking:'SPECIAL',icon:'🌅',desc:'弯道、低速路段、湖边平行停车'},
 store:{name:'城市超市',km:6,difficulty:'NORMAL',parking:'HARD',icon:'🛒',desc:'红绿灯、车流、行人、倒车入库'},
 fuel:{name:'加油站',km:4,difficulty:'EASY',parking:'EASY',icon:'⛽',desc:'短路线，大停车位'},
 wash:{name:'洗车中心',km:5,difficulty:'NORMAL',parking:'NORMAL',icon:'🫧',desc:'施工区、汇流、标准停车位'},
 cafe:{name:'湖景 Café',km:5.5,difficulty:'NORMAL',parking:'NORMAL',icon:'☕',desc:'城市道路 + 路边停车'},
 supermarket:{name:'Supermarket 超市',km:6,difficulty:'NORMAL',parking:'HARD',icon:'🛒',desc:'红绿灯、行人、倒车入库'},
 gym:{name:'Gym 健身房',km:5,difficulty:'NORMAL',parking:'NORMAL',icon:'🏋️',desc:'城市道路、汇流、停车'},
 park:{name:'Park 公园',km:4.5,difficulty:'EASY',parking:'NORMAL',icon:'🌳',desc:'住宅区、行人、路边停车'},
 cinema:{name:'Cinema 电影院',km:7,difficulty:'NORMAL',parking:'HARD',icon:'🎬',desc:'晚间车流、红绿灯、地下停车'},
 ski:{name:'Ski Resort 滑雪场',km:14,difficulty:'HARD',parking:'SPECIAL',icon:'❄️',desc:'山路弯道、湿滑路面、雪场停车'},
 amusement:{name:'Amusement Park 游乐园',km:10,difficulty:'HARD',parking:'HARD',icon:'🎡',desc:'车流密集、行人多、倒车停车'},
 restaurant:{name:'Restaurant 餐厅',km:5.8,difficulty:'NORMAL',parking:'NORMAL',icon:'🍽️',desc:'城市路口、限速、餐厅停车'},
 mall:{name:'Shopping Mall 商场',km:8,difficulty:'HARD',parking:'HARD',icon:'🛍️',desc:'繁忙车流、汇流、商场停车场'},
 convenience:{name:'Convenience Store 便利店',km:3.2,difficulty:'EASY',parking:'EASY',icon:'🏪',desc:'短途城市道路、简单停车'}
};
const PARKING_CONFIG={
 EASY:{label:'EASY',target:{x:70,y:30,w:22,h:31,angle:0},obstacles:[]},
 NORMAL:{label:'NORMAL',target:{x:68,y:28,w:19,h:27,angle:0},obstacles:[{x:46,y:25,w:16,h:24},{x:88,y:25,w:11,h:24}]},
 HARD:{label:'HARD',target:{x:69,y:23,w:17,h:24,angle:0},obstacles:[{x:49,y:21,w:17,h:26},{x:88,y:21,w:10,h:26},{x:51,y:60,w:18,h:25}]},
 SPECIAL:{label:'SPECIAL · PARALLEL',target:{x:69,y:34,w:22,h:16,angle:90},obstacles:[{x:69,y:14,w:22,h:14},{x:69,y:56,w:22,h:14}]}
};
const CAR_EVENT_TYPES=['redLight','speedCamera','speedBump','slowCar','pedestrian','roadwork','merge','turn','rain'];
const COUPLE_CAR_LINES={
 calm:['这个天气很适合开车。','慢慢开就好 ♡','这首歌不错欸。','等下到的时候拍一张照片。'],
 phone:['我回一下消息～','等我找一下路线。'],
 drink:['慢一点，我的奶茶要洒了 😂','这杯真的很好喝。'],
 sleep:['我先眯一下，到的时候叫我。','好困…我靠一下。'],
 brake:['吓我一跳 😂','哇，刚刚那一下很急欸！'],
 parkGood:['这个停车很可以 ♡','停得很正欸。'],
 parkBad:['嗯…要不要再修一下 😂','有一点歪，不过进去就好。']
};
let engineOsc=null,engineGain=null;
function carColor(car){return car.id==='black'?'#15171b':'#f1f1ef'}
function startEngineSound(){if(!state.audio?.enabled||!state.audio?.sfx)return;ensureAudio();if(!audioCtx||engineOsc)return;engineOsc=audioCtx.createOscillator();engineGain=audioCtx.createGain();engineOsc.type='sawtooth';engineOsc.frequency.value=58;engineGain.gain.value=state.audio.sfxVolume*.025;engineOsc.connect(engineGain);engineGain.connect(audioCtx.destination);engineOsc.start()}
function revEngine(v=.2){if(engineOsc&&audioCtx)engineOsc.frequency.setTargetAtTime(58+Math.max(0,Math.min(1,v))*155,audioCtx.currentTime,.07)}
function stopEngineSound(){if(engineOsc){try{engineOsc.stop()}catch(e){}engineOsc=null;engineGain=null}}
function driveTone(freq=120,dur=.12,vol=.08,type='square'){if(!state.audio?.enabled||!state.audio?.sfx)return;ensureAudio();if(!audioCtx)return;const n=audioCtx.currentTime,o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(state.audio.sfxVolume*vol,n);g.gain.exponentialRampToValueAtTime(.001,n+dur);o.connect(g);g.connect(audioCtx.destination);o.start(n);o.stop(n+dur+.02)}
function carMeter(label,value,icon){return `<div class="car-meter"><span>${icon} ${label}</span><div><i style="width:${Math.max(0,Math.min(100,value))}%"></i></div><b>${Math.round(value)}%</b></div>`}
function carPersonName(id){return id==='elyn'?'Elyn':'Shawn'}
function carPartner(id){return id==='elyn'?'shawn':'elyn'}
function carActorImg(id){return humanSpriteSrc(id,'idle')}
function carOverlay(inner,cls=''){document.querySelector('.car10-overlay')?.remove();const el=document.createElement('section');el.className='car10-overlay '+cls;el.innerHTML=inner;document.body.appendChild(el);return el}
function randomFrom(a){return a[Math.floor(Math.random()*a.length)]}
function carApproachTarget(carId,passenger=false){return carId==='black'?(passenger?[22,72]:[34,69]):(passenger?[79,72]:[65,69])}
function animateCarActorTo(id,target,dur=780){return new Promise(resolve=>{const el=$('#'+id);if(!el){resolve();return}const from=getPos(id),dx=target[0]-from[0],dy=target[1]-from[1],dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down'),img=el.querySelector('.base-sprite'),start=performance.now();if(img)img.src=humanSpriteSrc(id,dir);const step=now=>{const t=Math.min(1,(now-start)/dur),e=1-Math.pow(1-t,3);setPos(id,[from[0]+dx*e,from[1]+dy*e]);if(t<1)requestAnimationFrame(step);else{if(img)img.src=humanSpriteSrc(id,'idle');resolve()}};requestAnimationFrame(step)})}
async function approachCarAndOpen(carId){if(state.room!=='garage'){enterRoom('garage');await new Promise(r=>setTimeout(r,120))}await animateCarActorTo(state.active,carApproachTarget(carId,false));openCarGarage(carId,state.active)}

function openCarGarage(carId,driver=state.active){
 const car=state.cars[carId];driver=driver==='shawn'?'shawn':'elyn';let together=true;
 modal(`${car.name} · ${car.plate}`,`<div class="car10-garage"><div class="car10-garage-photo"><img src="${car.model}"><span>${car.plate}</span></div><div class="car10-garage-side"><div class="car10-driver-select"><b>今天谁开？</b><button data-car-driver="elyn" class="${driver==='elyn'?'active':''}"><img src="${carActorImg('elyn')}">Elyn</button><button data-car-driver="shawn" class="${driver==='shawn'?'active':''}"><img src="${carActorImg('shawn')}">Shawn</button></div><label class="car10-together"><input id="carTogether" type="checkbox" checked> 和 ${carPersonName(carPartner(driver))} 一起出门 ❤️</label><div class="car10-stat-stack">${carMeter('油量',car.fuel,'⛽')}${carMeter('清洁',car.clean,'✨')}${carMeter('车况',car.condition,'🛠️')}</div><div class="mileage">里程 <b>${Math.round(car.mileage).toLocaleString()} km</b><small>最佳驾驶 ${Math.round(car.stats.bestScore||0)} 分 · Perfect Park ${car.stats.perfectParks||0}</small></div></div><div class="car10-garage-actions"><button class="card primary" id="driveCarBtn">🚗 出门驾驶</button><button class="card race30-garage-btn" id="raceCarBtn">🏁 赛车模式</button><button class="card" id="interiorBtn">🎛️ 车内互动</button><button class="card" id="bootBtn">🧳 后备箱</button><button class="card" id="fuelCarBtn">⛽ 加油</button><button class="card" id="washCarBtn">🫧 洗车</button><button class="card" id="repairCarBtn">🛠️ 保养</button></div></div>`);
 const refreshDriver=d=>{driver=d;document.querySelectorAll('[data-car-driver]').forEach(b=>b.classList.toggle('active',b.dataset.carDriver===driver));const lab=$('.car10-together');if(lab)lab.lastChild.textContent=` 和 ${carPersonName(carPartner(driver))} 一起出门 ❤️`};
 document.querySelectorAll('[data-car-driver]').forEach(b=>b.onclick=()=>refreshDriver(b.dataset.carDriver));
 $('#driveCarBtn').onclick=()=>{together=$('#carTogether').checked;openDriveDestinations(carId,driver,together)};
 $('#raceCarBtn').onclick=()=>{together=$('#carTogether').checked;openRace30Hub(carId,driver,together)};
 $('#interiorBtn').onclick=()=>openCarInterior(carId,driver,$('#carTogether').checked,null,true);
 $('#bootBtn').onclick=()=>openCarStorage(carId);
 $('#fuelCarBtn').onclick=()=>openRefuelGame(carId);
 $('#washCarBtn').onclick=()=>openCarWashGame(carId);
 $('#repairCarBtn').onclick=()=>{const missing=100-car.condition,cost=Math.ceil(missing*2);if(missing<1){toast('车况很好，不需要保养');return}if(state.coins<cost){toast(`需要 ${cost} Coins`);return}state.coins-=cost;car.condition=100;save();renderTaskUI();toast('保养完成 · 车况 100%');openCarGarage(carId,driver)};
}
function openDriveDestinations(carId,driver,together){const car=state.cars[carId];modal('选择目的地',`<div class="route-head"><img src="${car.model}"><div><b>${car.plate}</b><p>司机：${carPersonName(driver)} ${together?'· 乘客：'+carPersonName(carPartner(driver)):'· 单独出门'}</p><small>不是自动到达：上车、系安全带、发动、自己驾驶、自己停车。</small></div></div><div class="destination-grid car10-dest-grid">${Object.entries(CAR_ROUTES).map(([id,r])=>`<button class="destination-card" data-dest="${id}"><span>${r.icon}</span><b>${r.name}</b><small>${r.km} km · ${r.difficulty}<br>${r.desc}</small></button>`).join('')}</div>`);document.querySelectorAll('[data-dest]').forEach(b=>b.onclick=()=>prepareCarTrip(carId,b.dataset.dest,driver,together))}

async function prepareCarTrip(carId,dest,driver,together){
 $('#modalRoot').innerHTML='';await animateCarActorTo(driver,carApproachTarget(carId,false));if(together)await animateCarActorTo(carPartner(driver),carApproachTarget(carId,true),650);playCarEntrySequence(carId,dest,driver,together)
}
function playCarEntrySequence(carId,dest,driver,together){
 const car=state.cars[carId],passenger=carPartner(driver),el=carOverlay(`<div class="car10-entry-bg"></div><div class="car10-entry-stage"><div class="car10-entry-copy"><span>上车</span><h1>${car.plate}</h1><p id="entryText">${carPersonName(driver)} 走到驾驶座车门…</p></div><div class="car10-entry-car"><img src="${car.model}"><div class="car10-door driver" id="entryDoor"></div><div class="car10-door passenger" id="passengerDoor"></div></div><img class="car10-entry-person driver" id="entryDriver" src="${carActorImg(driver)}"><img class="car10-entry-person passenger ${together?'':'hidden'}" id="entryPassenger" src="${carActorImg(passenger)}"><div class="car10-entry-actions" id="entryActions"></div></div>`, 'entry-mode');
 const txt=$('#entryText'),door=$('#entryDoor'),pdoor=$('#passengerDoor'),dimg=$('#entryDriver'),pimg=$('#entryPassenger');
 setTimeout(()=>{txt.textContent='拉开驾驶座车门…';door.classList.add('open');driveTone(250,.1,.06)},450);
 setTimeout(()=>{txt.textContent=`${carPersonName(driver)} 转身坐进驾驶座…`;dimg.classList.add('enter')},1100);
 setTimeout(()=>{door.classList.remove('open');txt.textContent='驾驶座车门关上。';driveTone(180,.09,.06)},1900);
 if(together){setTimeout(()=>{pdoor.classList.add('open');txt.textContent=`${carPersonName(passenger)} 打开副驾驶车门…`},2350);setTimeout(()=>{pimg.classList.add('enter');txt.textContent=`${carPersonName(passenger)} 坐进副驾驶。`},2950);setTimeout(()=>{pdoor.classList.remove('open');txt.textContent='两个人都坐好了 ♡'},3650)}
 setTimeout(()=>{$('#entryActions').innerHTML=`<button class="mama-btn" id="toInterior">进入车内</button>`;$('#toInterior').onclick=()=>openCarInterior(carId,driver,together,dest,false)},together?4200:2450)
}
function openCarInterior(carId,driver,together,dest=null,preview=false){
 const car=state.cars[carId],passenger=carPartner(driver),interior=car.interior;let belted=false,passengerBelted=!together,engine=false;
 const el=carOverlay(`<div class="car10-interior-bg ${new Date().getHours()>=19||new Date().getHours()<6?'night':''}"><div class="car10-windshield-view"></div><div class="car10-mirror left">◀</div><div class="car10-mirror right">▶</div><div class="car10-passenger ${together?'':'hidden'}"><img src="${carActorImg(passenger)}"><span id="interiorPassengerBubble">${together?'坐好了 ♡':''}</span></div><div class="car10-dashboard"><div class="car10-wheel">◯</div><div class="car10-cluster"><b>${car.plate}</b><span id="interiorEngine">ENGINE OFF</span><small>Fuel ${Math.round(car.fuel)}%</small></div><div class="car10-console"><button id="seatbeltBtn">🔒 系安全带</button><button id="engineBtn">🔘 START</button><button id="acBtn">❄️ AC ${interior.ac?'ON':'OFF'}</button><button id="musicControlBtn">🎵 ${interior.music}</button><button id="windowBtn">🪟 车窗 ${interior.windows?'开':'关'}</button><button id="interiorLightBtn">💡 车内灯 ${interior.light?'ON':'OFF'}</button><button id="phoneHolderBtn">📱 手机架</button><button id="cupHolderBtn">🥤 杯架</button><button id="gloveBtn">🧤 手套箱</button></div></div><div class="car10-interior-footer"><div id="interiorHint">先系安全带，再启动车辆。</div>${preview?'<button class="mama-btn secondary" id="exitInterior">离开车内</button>':'<button class="mama-btn" id="beginDriveBtn" disabled>开始驾驶</button>'}</div></div>`, 'interior-mode');
 const update=()=>{$('#seatbeltBtn').textContent=belted?'✅ 安全带已系':'🔒 系安全带';$('#engineBtn').textContent=engine?'⏹ ENGINE ON':'🔘 START';$('#interiorEngine').textContent=engine?'ENGINE ON':'ENGINE OFF';if(!preview)$('#beginDriveBtn').disabled=!(belted&&engine);$('#interiorHint').textContent=!belted?'必须先系安全带。':!engine?'安全带好了，按 START 发动。':'准备好了，可以出发。'};
 $('#seatbeltBtn').onclick=()=>{belted=!belted;if(together)passengerBelted=belted;driveTone(620,.08,.05,'sine');update()};
 $('#engineBtn').onclick=()=>{if(!belted){toast('先系安全带');return}engine=!engine;if(engine){startEngineSound();revEngine(.18);driveTone(420,.18,.05,'sine')}else stopEngineSound();update()};
 $('#acBtn').onclick=()=>{interior.ac=!interior.ac;$('#acBtn').textContent=`❄️ AC ${interior.ac?'ON':'OFF'}`;save()};
 $('#musicControlBtn').onclick=()=>{const tracks=['Cozy FM','Rainy Night','City Pop','Quiet Drive'];let i=tracks.indexOf(interior.music);interior.music=tracks[(i+1)%tracks.length];$('#musicControlBtn').textContent='🎵 '+interior.music;toast('音乐：'+interior.music);save()};
 $('#windowBtn').onclick=()=>{interior.windows=interior.windows?0:1;$('#windowBtn').textContent=`🪟 车窗 ${interior.windows?'开':'关'}`;driveTone(190,.2,.035);save()};
 $('#interiorLightBtn').onclick=()=>{interior.light=!interior.light;$('#interiorLightBtn').textContent=`💡 车内灯 ${interior.light?'ON':'OFF'}`;el.classList.toggle('light-on',interior.light);save()};
 $('#phoneHolderBtn').onclick=()=>toast(interior.phoneHolder?'手机已经固定在手机架上 📱':'没有安装手机架');
 $('#cupHolderBtn').onclick=()=>openCarStorage(carId,'cups',()=>openCarInterior(carId,driver,together,dest,preview));
 $('#gloveBtn').onclick=()=>openCarStorage(carId,'glove',()=>openCarInterior(carId,driver,together,dest,preview));
 if(preview){$('#exitInterior').onclick=()=>{stopEngineSound();document.querySelector('.car10-overlay')?.remove();openCarGarage(carId,driver)}}else $('#beginDriveBtn').onclick=()=>{if(!belted||!engine)return;startCarDrive10(carId,dest,driver,together,{belted,passengerBelted})};
 update();
}

function carCameraMarkup(car,driver,together,camera){
 const passenger=carPartner(driver);
 const scenic=car.id==='black'?'./assets/cars/ui28/drive-black.jpg':'./assets/cars/ui28/drive-white.jpg';
 return `<div class="car10-camera car10-${camera} car29-live-world" id="carCamera">
   <div class="car28-scenic car29-backdrop" id="car29Backdrop" style="background-image:url('${scenic}')"></div>
   <canvas id="car29RoadCanvas" class="car29-road-canvas" aria-hidden="true"></canvas>
   <div class="car10-sky"></div>
   <div class="car10-road car29-road-events" id="carRoad"><div id="carTraffic"></div><div id="carRoadEvent"></div></div>
   <div class="car29-player-car ${car.id==='black'?'black':'white'}" id="car29PlayerCar">
     <div class="car29-cabin">
       <div class="car29-heads">
         <img src="${carActorImg(driver)}" alt="">
         ${together?`<img src="${carActorImg(passenger)}" alt="">`:''}
       </div>
     </div>
     <div class="car29-rear-shell">
       <i class="tail left"></i><i class="tail right"></i>
       <span class="car29-lexus">LEXUS</span>
       <b class="car29-plate">${car.plate}</b>
       <i class="exhaust left"></i><i class="exhaust right"></i>
     </div>
   </div>
   <div class="car10-rain" id="rainLayer"></div><div class="car10-night" id="nightLayer"></div>
   <div class="car10-third-car"><img src="${car.model}"><b>${car.plate}</b></div>
   <div class="car10-first-cockpit"><div class="car28-first-windshield"></div><div class="car10-first-wheel">♡</div><div class="car10-first-hood"><img src="${car.model}"></div><div class="car10-drive-passenger ${together?'':'hidden'}" id="drivePassenger"><img src="${carActorImg(passenger)}"><span id="passengerBubble"></span><em id="passengerProp"></em></div></div>
   <div class="car10-reverse-view"><div class="reverse-guides"><i></i><i></i><i></i></div><small>REVERSE CAMERA</small></div>
   <div class="car10-wipers" id="wiperLayer"><i></i><i></i></div>
 </div>`}
function startCarDrive10(carId,dest,driver,together,tripInit){
 const car=state.cars[carId],route=CAR_ROUTES[dest],night=new Date().getHours()>=19||new Date().getHours()<6;stopEngineSound();startEngineSound();
 let camera=state.carSettings.camera||'third',gear='D',speed=0,lateral=0,steer=0,curve=0,targetCurve=0,progress=0,last=performance.now(),alive=true,signal='off',headlights=night,wipers=false,handbrake=false,rain=(state.weather==='小雨'||state.weather==='阵雨'),event=null,eventIndex=0,nextEventKm=.65,traffic=[],trafficTimer=0,passengerTimer=0,stoppedRed=0;
 const metrics={safety:100,smooth:100,rules:100,signalGood:0,signalNeed:0,collisions:0,hardBrakes:0,redStops:0,curb:0,eventsGood:0,eventsBad:0};
 const keys={},controls={gas:false,brake:false,left:false,right:false};
 const el=carOverlay(`${carCameraMarkup(car,driver,together,camera)}<div class="car10-drive-hud"><div class="car10-drive-title"><b>${route.icon} ${route.name}</b><span>${route.km} km · ${route.difficulty}</span></div><div class="car10-speed"><span id="driveSpeed">0</span><small>km/h</small><b id="driveGear">D</b></div><div class="car10-hud-bars"><span>⛽ <b id="driveFuel">${Math.round(car.fuel)}%</b></span><span>🛠️ <b id="driveCondition">${Math.round(car.condition)}%</b></span><span>⭐ <b id="driveSafety">100</b></span><span>🛣️ <b id="driveDistance">0.0/${route.km}</b></span></div></div><div class="car10-nav"><b id="driveEventTitle">导航：直行</b><span id="driveEventHint">限速 80 · 保持车道</span><em id="driveSignalText">SIGNAL OFF</em></div><div class="car10-drive-message" id="driveMessage">W/↑ 油门 · S/↓ 刹车 · A/D 转向 · G D/R · C 镜头</div><div class="car10-mobile-controls"><button data-car10="left">←</button><button data-car10="gas">油门</button><button data-car10="brake">刹车</button><button data-car10="right">→</button><button id="gearControl">D / R</button><button id="signalLeft">↙</button><button id="signalRight">↘</button><button id="cameraControl">📷</button><button id="hornControl">📣</button><button id="lightControl">💡</button><button id="wiperControl">🌧️</button><button id="handbrakeControl">P</button></div><button class="drive-exit" id="driveAbort">结束驾驶</button>`, 'drive10-mode');
 const cam=$('#carCamera');
 const setCamera=c=>{camera=c;state.carSettings.camera=c;cam.classList.remove('car10-third','car10-first','car10-reverse');cam.classList.add('car10-'+c);save()};setCamera(camera);
 const cycleCamera=()=>setCamera(camera==='third'?'first':camera==='first'?'reverse':'third');
 const toggleGear=()=>{if(speed>4){flashDrive('先停稳再换 D/R');return}gear=gear==='D'?'R':'D';$('#driveGear').textContent=gear;$('#gearControl').textContent=gear==='D'?'D / R':'R / D';if(gear==='R')setCamera('reverse');else if(camera==='reverse')setCamera('third');driveTone(350,.06,.04,'sine')};
 const setSignal=s=>{signal=signal===s?'off':s;$('#driveSignalText').textContent=signal==='off'?'SIGNAL OFF':signal==='left'?'⬅ LEFT SIGNAL':'RIGHT SIGNAL ➡';$('#driveSignalText').className=signal==='off'?'':'on '+signal;driveTone(720,.05,.03,'sine')};
 const flashDrive=t=>{const m=$('#driveMessage');if(!m)return;m.textContent=t;m.classList.add('alert');clearTimeout(m._t);m._t=setTimeout(()=>{m.classList.remove('alert');m.textContent='W/↑ 油门 · S/↓ 刹车 · A/D 转向 · G D/R · C 镜头'},1300)};
 const passengerReact=(kind='calm')=>{if(!together)return;const b=$('#passengerBubble'),p=$('#passengerProp'),box=$('#drivePassenger');if(!b)return;b.textContent=randomFrom(COUPLE_CAR_LINES[kind]||COUPLE_CAR_LINES.calm);p.textContent=kind==='phone'?'📱':kind==='drink'?'🧋':kind==='sleep'?'💤':'';box.className='car10-drive-passenger '+kind;clearTimeout(box._t);box._t=setTimeout(()=>{box.className='car10-drive-passenger';b.textContent='';p.textContent=''},4200)};
 const horn=()=>{driveTone(230,.22,.09,'square');flashDrive('📣 BEEP!');if(together&&Math.random()<.35)passengerReact('calm')};
 const toggleLights=()=>{headlights=!headlights;$('#lightControl').classList.toggle('active',headlights);cam.classList.toggle('headlights',headlights);flashDrive(headlights?'车灯开启':'车灯关闭')};
 const toggleWipers=()=>{wipers=!wipers;$('#wiperControl').classList.toggle('active',wipers);$('#wiperLayer').classList.toggle('on',wipers);flashDrive(wipers?'雨刷开启':'雨刷关闭')};
 const toggleHandbrake=()=>{handbrake=!handbrake;$('#handbrakeControl').classList.toggle('active',handbrake);flashDrive(handbrake?'手刹 ON':'手刹 OFF')};
 document.querySelectorAll('[data-car10]').forEach(b=>{const k=b.dataset.car10;b.onpointerdown=e=>{controls[k]=true;b.setPointerCapture?.(e.pointerId)};b.onpointerup=()=>controls[k]=false;b.onpointercancel=()=>controls[k]=false});
 $('#gearControl').onclick=toggleGear;$('#signalLeft').onclick=()=>setSignal('left');$('#signalRight').onclick=()=>setSignal('right');$('#cameraControl').onclick=cycleCamera;$('#hornControl').onclick=horn;$('#lightControl').onclick=toggleLights;$('#wiperControl').onclick=toggleWipers;$('#handbrakeControl').onclick=toggleHandbrake;
 const kd=e=>{const k=e.key.toLowerCase();keys[k]=true;if(k==='g')toggleGear();if(k==='q')setSignal('left');if(k==='e')setSignal('right');if(k==='c')cycleCamera();if(k==='h')horn();if(k==='l')toggleLights();if(k==='x')toggleWipers();if(e.code==='Space'){e.preventDefault();toggleHandbrake()}};const ku=e=>{keys[e.key.toLowerCase()]=false};window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);
 const cleanup=()=>{window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku);stopEngineSound();el.remove()};$('#driveAbort').onclick=()=>{alive=false;cleanup();toast('已结束驾驶')};
 const spawnTraffic=()=>{const root=$('#carTraffic');if(!root)return;const node=document.createElement('div');const lane=(Math.random()-.5)*1.25;node.className='car10-traffic';node.textContent=Math.random()<.12?'🚚':Math.random()<.3?'🚕':'🚙';root.appendChild(node);traffic.push({node,lane,z:0,hit:false,slow:Math.random()<.25})};
 const makeEvent=()=>{eventIndex++;let type=CAR_EVENT_TYPES[(hashString(dest)+eventIndex*3)%CAR_EVENT_TYPES.length];if(type==='rain'&&rain)type='turn';if(dest==='lake'&&eventIndex===1)type='turn';if(dest==='store'&&eventIndex===1)type='redLight';const side=Math.random()<.5?'left':'right';event={type,side,distance:230,resolved:false,green:false,stopped:false};const title=$('#driveEventTitle'),hint=$('#driveEventHint'),root=$('#carRoadEvent');root.innerHTML='';const n=document.createElement('div');n.className='car10-road-event '+type;root.appendChild(n);if(type==='redLight'){title.textContent='🚦 前方红灯';hint.textContent='停止线前完全停下，等绿灯';n.innerHTML='<div class="car10-light"><i class="red"></i><i></i><i></i></div><div class="car10-stopline"></div>';setTimeout(()=>{if(event&&event.type==='redLight'){event.green=true;n.classList.add('green');title.textContent='🟢 绿灯';hint.textContent='确认安全后继续'}},3000)}else if(type==='speedCamera'){title.textContent='📷 测速区';hint.textContent='前方限速 50 km/h';n.innerHTML='<div class="car10-sign">📷<b>50</b></div>'}else if(type==='speedBump'){title.textContent='⚠️ 减速带';hint.textContent='降到 25 km/h 以下';n.innerHTML='<div class="car10-bump"></div>'}else if(type==='slowCar'){title.textContent='🚙 慢车在前';hint.textContent='减速，或打灯后安全变道';n.innerHTML='<div class="car10-event-car">🚙</div>'}else if(type==='pedestrian'){title.textContent='🚶 行人过马路';hint.textContent='减速停车让行';n.innerHTML='<div class="car10-crossing">🚶</div>'}else if(type==='roadwork'){title.textContent='🚧 施工封道';hint.textContent=`打${side==='left'?'左':'右'}灯并提前靠${side==='left'?'左':'右'}`;n.innerHTML='<div class="car10-cones">🚧 🚧 🚧</div>'}else if(type==='merge'){title.textContent='↔️ 车道汇流';hint.textContent=`打${side==='left'?'左':'右'}灯，控制速度汇入`;n.innerHTML='<div class="car10-sign">↔️<b>MERGE</b></div>'}else if(type==='turn'){title.textContent=`↪️ 前方${side==='left'?'左':'右'}转`;hint.textContent=`提前打${side==='left'?'左':'右'}灯并降速`;n.innerHTML=`<div class="car10-sign">${side==='left'?'↩️':'↪️'}<b>TURN</b></div>`}else if(type==='rain'){rain=true;title.textContent='🌧️ 开始下雨';hint.textContent='打开雨刷，路面抓地力下降';cam.classList.add('raining');n.innerHTML='<div class="car10-sign">🌧️<b>RAIN</b></div>';passengerReact('calm')};metrics.signalNeed+=['roadwork','merge','turn'].includes(type)?1:0};
 const goodEvent=(msg)=>{metrics.eventsGood++;flashDrive('✓ '+msg);driveTone(760,.06,.03,'sine')};const badEvent=(pen,msg)=>{metrics.eventsBad++;metrics.rules=Math.max(0,metrics.rules-pen);metrics.safety=Math.max(0,metrics.safety-pen*.65);flashDrive(msg);driveTone(110,.15,.08)};
 const resolveEvent=()=>{if(!event||event.resolved)return;event.resolved=true;const t=event.type,correctSignal=signal===event.side;if(t==='redLight'){if(!event.green){badEvent(25,'🚦 闯红灯！');state.coins=Math.max(0,state.coins-15)}else if(event.stopped){metrics.redStops++;car.stats.redStops++;goodEvent('红灯停车正确')}else badEvent(6,'通过前没有完整停车')}if(t==='speedCamera'){speed>56?badEvent(12,'📷 超速通过测速区'):goodEvent('限速控制正确')}if(t==='speedBump'){if(speed>32){badEvent(12,'💥 减速带速度太快');car.condition=Math.max(0,car.condition-2);speed*=.62;passengerReact('brake')}else goodEvent('平稳通过减速带')}if(t==='slowCar'){if(speed<60||Math.abs(lateral)>.55){if(Math.abs(lateral)>.55&&signal==='off')badEvent(5,'变道没有打灯');else goodEvent('安全处理慢车')}else badEvent(9,'跟车太近 / 速度太快')}if(t==='pedestrian'){if(speed<7)goodEvent('礼让行人');else badEvent(18,'🚶 没有停车让行')}if(['roadwork','merge','turn'].includes(t)){if(correctSignal){metrics.signalGood++;goodEvent('方向灯使用正确')}else badEvent(7,'该打方向灯');if(t==='roadwork'&&Math.sign(lateral)!==(event.side==='left'?-1:1)&&Math.abs(lateral)<.55){badEvent(10,'🚧 进入封闭区域');car.condition=Math.max(0,car.condition-3)}if(t==='turn'&&speed>60)badEvent(7,'转弯速度太快')}if(t==='rain'){if(wipers)goodEvent('雨刷开启及时');else badEvent(5,'下雨但没有开雨刷')}signal='off';$('#driveSignalText').textContent='SIGNAL OFF';$('#driveSignalText').className='';$('#carRoadEvent').innerHTML='';nextEventKm=progress+.65+Math.random()*.55;event=null;setTimeout(()=>{if($('#driveEventTitle')){$('#driveEventTitle').textContent='导航：继续直行';$('#driveEventHint').textContent='保持车道，注意前方路况'}},700)};
 const finishRoad=()=>{alive=false;save();cleanup();startParkingGame10(carId,dest,driver,together,metrics)};
 if(night){cam.classList.add('night-driving');if(headlights)cam.classList.add('headlights')}if(rain)cam.classList.add('raining');
 const loop=now=>{if(!alive)return;const dt=Math.min(.045,(now-last)/1000);last=now;const gas=keys['w']||keys['arrowup']||controls.gas,brake=keys['s']||keys['arrowdown']||controls.brake,left=keys['a']||keys['arrowleft']||controls.left,right=keys['d']||keys['arrowright']||controls.right;
  const oldSpeed=speed;if(handbrake)speed=Math.max(0,speed-115*dt);else{if(gas)speed+=gear==='D'?48*dt:32*dt;else speed-=8*dt;if(brake)speed-=92*dt}speed=Math.max(0,Math.min(gear==='D'?145:35,speed));const hardDecel=(oldSpeed-speed)/Math.max(dt,.001);if(hardDecel>62&&oldSpeed>35){metrics.hardBrakes++;metrics.smooth=Math.max(0,metrics.smooth-dt*22);if(together&&Math.random()<.25)passengerReact('brake')}const steerInput=(right?1:0)-(left?1:0);steer+=(steerInput-steer)*dt*(speed<25?5.8:3.3);const grip=rain?.76:1;lateral+=steer*(.34+.012*speed)*dt*grip*(gear==='R'?-1:1);lateral-=curve*speed*.00065*dt;lateral=Math.max(-1.46,Math.min(1.46,lateral));if(Math.random()<dt*.09)targetCurve=(Math.random()-.5)*1.2;curve+=(targetCurve-curve)*dt*.48;const speedLimit=Math.abs(curve)>.65?55:Math.abs(curve)>.36?75:90;if(speed>speedLimit+18){metrics.safety=Math.max(0,metrics.safety-dt*4);$('#driveEventHint').textContent=`弯道限速 ${speedLimit} · 你太快了`}if(Math.abs(lateral)>1.02){metrics.safety=Math.max(0,metrics.safety-dt*8);car.condition=Math.max(0,car.condition-dt*.8);metrics.curb++;if(Math.abs(lateral)>1.33)speed*=.992}if(night&&!headlights){metrics.safety=Math.max(0,metrics.safety-dt*2.5);cam.classList.add('dark-vision')}else cam.classList.remove('dark-vision');if(rain&&!wipers){metrics.safety=Math.max(0,metrics.safety-dt*1.8);cam.classList.add('rain-blur')}else cam.classList.remove('rain-blur');
  if(gear==='D')progress+=speed*dt/3600;else progress=Math.max(0,progress-speed*dt/7200);car.fuel=Math.max(0,car.fuel-speed*dt*.00044);car.clean=Math.max(0,car.clean-dt*.010*(1+speed/100)*(rain?1.8:1));revEngine(speed/(gear==='D'?145:35));if(!event&&progress>=nextEventKm&&progress<route.km-.6)makeEvent();if(event){event.distance-=Math.max(1,speed)*dt*.42;const n=$('.car10-road-event');if(n){const z=Math.max(.18,1-event.distance/240);n.style.transform=`translate(-50%,-50%) scale(${.38+z*1.15})`;n.style.top=(16+z*60)+'%' }if(event.type==='redLight'&&!event.green&&event.distance<32&&speed<4){stoppedRed+=dt;event.stopped=stoppedRed>.45}else if(event.type==='pedestrian'&&event.distance<32&&speed<4)event.stopped=true;if(event.distance<=0)resolveEvent()}
  trafficTimer+=dt;if(trafficTimer>1.8-Math.min(.55,speed/260)){trafficTimer=0;spawnTraffic()}traffic.forEach(t=>{t.z+=dt*(.16+speed/210);const p=Math.min(1.15,t.z),px=50+t.lane*28/(1.1-Math.min(.95,p)*.48)+curve*9,py=15+p*74;t.node.style.left=px+'%';t.node.style.top=py+'%';t.node.style.transform=`translate(-50%,-50%) scale(${.28+p*1.0})`;if(!t.hit&&p>.80&&p<1.05&&Math.abs(t.lane-lateral)<.34){t.hit=true;metrics.collisions++;car.stats.collisions++;metrics.safety=Math.max(0,metrics.safety-19);car.condition=Math.max(0,car.condition-7);speed*=.48;t.node.classList.add('hit');flashDrive('💥 碰撞！更早刹车或变道');passengerReact('brake')}if(p>1.2){t.node.remove();t.dead=true}});for(let i=traffic.length-1;i>=0;i--)if(traffic[i].dead)traffic.splice(i,1);
  passengerTimer+=dt;if(together&&passengerTimer>11+Math.random()*8){passengerTimer=0;passengerReact(randomFrom(['calm','phone','drink','sleep']))}
  const road=$('#carRoad');if(road)road.style.transform=`perspective(720px) rotateZ(${curve*3.2}deg) translateX(${curve*80-lateral*22}px)`;const wheel=$('#driveWheel');if(wheel)wheel.style.transform=`rotate(${steer*48-curve*10}deg)`;$('#driveSpeed').textContent=Math.round(speed);$('#driveGear').textContent=gear;$('#driveFuel').textContent=Math.round(car.fuel)+'%';$('#driveCondition').textContent=Math.round(car.condition)+'%';$('#driveSafety').textContent=Math.round(metrics.safety);$('#driveDistance').textContent=`${Math.min(route.km,progress).toFixed(1)}/${route.km}`;cam.style.setProperty('--lateral',lateral);cam.style.setProperty('--curve',curve);
  if(car.fuel<=0){alive=false;cleanup();state.coins=Math.max(0,state.coins-80);save();modal('没油了 😵','<p>道路救援扣除 80 Coins。下次出发前先检查油量。</p>');return}if(progress>=route.km){finishRoad();return}requestAnimationFrame(loop)};requestAnimationFrame(loop)
}

function startParkingGame10(carId,dest,driver,together,metrics){
 const car=state.cars[carId],difficulty=CAR_ROUTES[dest].parking,cfg=PARKING_CONFIG[difficulty],tgt=cfg.target;let x=22,y=77,angle=difficulty==='SPECIAL'?90:0,speed=0,gear='D',steer=0,alive=true,last=performance.now(),collisions=0,curb=false,elapsed=0;const keys={},controls={gas:false,brake:false,left:false,right:false};
 const el=carOverlay(`<div class="car10-parking-lot"><div class="car10-parking-curb top"></div><div class="car10-parking-curb bottom"></div><div class="car10-parking-target" style="left:${tgt.x}%;top:${tgt.y}%;width:${tgt.w}%;height:${tgt.h}%;transform:translate(-50%,-50%) rotate(${tgt.angle}deg)"><span>${cfg.label}</span></div>${cfg.obstacles.map((o,i)=>`<div class="car10-park-obstacle" style="left:${o.x}%;top:${o.y}%;width:${o.w}%;height:${o.h}%"><span>${i%2?'🚙':'🚗'}</span></div>`).join('')}<div class="car10-parking-car" id="parkingCar"><img src="${car.model}"><b>${car.plate}</b></div></div><div class="car10-parking-hud"><div><span>${cfg.label}</span><h2>${difficulty==='SPECIAL'?'平行停车':difficulty==='HARD'?'倒车入库':'停车入位'}</h2><p>自己控制 D/R、油门、刹车、方向。停进白线后按「完成停车」。</p></div><div class="car10-park-stats"><span>档位 <b id="parkGear">D</b></span><span>速度 <b id="parkSpeed">0</b></span><span>角度 <b id="parkAngle">0°</b></span><span>碰撞 <b id="parkHits">0</b></span></div></div><div class="car10-parking-controls"><button data-park10="left">←</button><button data-park10="gas">油门</button><button id="parkGearBtn">D/R</button><button data-park10="brake">刹车</button><button data-park10="right">→</button><button class="finish" id="finishParking">完成停车</button></div><button class="drive-exit" id="parkAbort">放弃停车</button>`, 'parking10-mode');
 const kd=e=>{keys[e.key.toLowerCase()]=true;if(e.key.toLowerCase()==='g')toggleGear()};const ku=e=>keys[e.key.toLowerCase()]=false;window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);document.querySelectorAll('[data-park10]').forEach(b=>{const k=b.dataset.park10;b.onpointerdown=e=>{controls[k]=true;b.setPointerCapture?.(e.pointerId)};b.onpointerup=()=>controls[k]=false;b.onpointercancel=()=>controls[k]=false});
 const toggleGear=()=>{if(Math.abs(speed)>2){toast('先停稳再换挡');return}gear=gear==='D'?'R':'D';$('#parkGear').textContent=gear;$('#parkGearBtn').textContent=gear==='D'?'D/R':'R/D';driveTone(340,.06,.04,'sine')};$('#parkGearBtn').onclick=toggleGear;
 const cleanup=()=>{window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku);el.remove()};$('#parkAbort').onclick=()=>{alive=false;cleanup();openCarGarage(carId,driver)};
 const rectOverlap=(cx,cy,w,h,o)=>Math.abs(cx-o.x)<(w+o.w)/2&&Math.abs(cy-o.y)<(h+o.h)/2;
 const evaluate=()=>{const dx=(x-tgt.x)/(tgt.w*.5),dy=(y-tgt.y)/(tgt.h*.5),inside=Math.abs(dx)<=.75&&Math.abs(dy)<=.75;let ad=Math.abs(((angle-tgt.angle+180)%360)-180);if(ad>180)ad=360-ad;let result='TOO FAR',score=25;if(curb){result='HIT CURB';score=35}else if(inside&&ad<=8&&collisions===0){result='PERFECT';score=100}else if(inside&&ad<=18){result='GOOD';score=82-Math.min(20,collisions*8)}else if(inside){result='CROOKED';score=58-Math.min(15,collisions*6)}else if(Math.hypot(dx,dy)<1.25){result='TOO FAR';score=45}else score=25;return{result,score:Math.max(0,Math.round(score)),inside,angleDiff:Math.round(ad)}};
 $('#finishParking').onclick=()=>{if(Math.abs(speed)>3){toast('先把车停稳');return}const r=evaluate();if(!r.inside&&r.result==='TOO FAR'){toast('车还没有进停车位，可以继续调整');return}alive=false;metrics.parking=r.score;metrics.parkingResult=r.result;metrics.parkingHits=collisions;if(r.result==='PERFECT'){car.stats.perfectParks++;if(together)passengerCarComment(carPartner(driver),'parkGood')}else if(together)passengerCarComment(carPartner(driver),'parkBad');cleanup();showCarTripScore(carId,dest,driver,together,metrics,r)};
 const loop=now=>{if(!alive)return;const dt=Math.min(.04,(now-last)/1000);last=now;elapsed+=dt;const gas=keys['w']||keys['arrowup']||controls.gas,brake=keys['s']||keys['arrowdown']||controls.brake,left=keys['a']||keys['arrowleft']||controls.left,right=keys['d']||keys['arrowright']||controls.right;if(gas)speed+=18*dt;else speed*=Math.pow(.965,dt*60);if(brake)speed-=28*dt;speed=Math.max(0,Math.min(13,speed));const si=(right?1:0)-(left?1:0);steer+=(si-steer)*dt*6;const dir=gear==='D'?1:-1,rad=(angle-90)*Math.PI/180;x+=Math.cos(rad)*speed*dt*dir*.55;y+=Math.sin(rad)*speed*dt*dir*.55;angle+=steer*speed*dt*dir*2.35;x=Math.max(4,Math.min(96,x));y=Math.max(5,Math.min(95,y));if(y<9||y>91){curb=true;speed*=.35;metrics.curb++;car.condition=Math.max(0,car.condition-.5)}for(const o of cfg.obstacles){if(rectOverlap(x,y,9,6,o)&&speed>.2){collisions++;car.condition=Math.max(0,car.condition-2);speed=0;x-=Math.cos(rad)*1.3*dir;y-=Math.sin(rad)*1.3*dir;driveTone(100,.13,.08)}}const pc=$('#parkingCar');pc.style.left=x+'%';pc.style.top=y+'%';pc.style.transform=`translate(-50%,-50%) rotate(${angle}deg)`;$('#parkSpeed').textContent=speed.toFixed(1);$('#parkAngle').textContent=Math.round(((angle%360)+360)%360)+'°';$('#parkHits').textContent=collisions;requestAnimationFrame(loop)};requestAnimationFrame(loop)
}
function passengerCarComment(passenger,kind){toast(`${carPersonName(passenger)}：${randomFrom(COUPLE_CAR_LINES[kind]||COUPLE_CAR_LINES.calm)}`)}
function showCarTripScore(carId,dest,driver,together,metrics,parking){
 const car=state.cars[carId],signalScore=metrics.signalNeed?Math.min(100,metrics.signalGood/metrics.signalNeed*100):100,road=Math.round(metrics.safety*.45+metrics.smooth*.20+metrics.rules*.25+signalScore*.10),final=Math.max(0,Math.min(100,Math.round(road*.72+parking.score*.28))),grade=final>=93?'S':final>=85?'A':final>=72?'B':final>=58?'C':'D';car.stats.bestScore=Math.max(car.stats.bestScore||0,final);car.stats.trips=(car.stats.trips||0)+1;car.mileage+=CAR_ROUTES[dest].km;car.last=CAR_ROUTES[dest].name;save();
 const el=carOverlay(`<div class="car10-score-card"><img src="${car.model}"><span class="car10-grade grade-${grade}">${grade}</span><h1>DRIVING SCORE · ${final}/100</h1><div class="car10-score-grid"><div><b>${Math.round(metrics.safety)}</b><span>安全驾驶</span></div><div><b>${Math.round(metrics.smooth)}</b><span>平顺度</span></div><div><b>${Math.round(metrics.rules)}</b><span>交通规则</span></div><div><b>${Math.round(signalScore)}</b><span>方向灯</span></div><div><b>${parking.score}</b><span>停车 · ${parking.result}</span></div></div><div class="car10-score-notes"><span>碰撞 ${metrics.collisions}</span><span>急刹 ${metrics.hardBrakes}</span><span>红灯正确停车 ${metrics.redStops}</span><span>路肩 ${metrics.curb}</span></div><button class="mama-btn" id="finishTripExit">熄火 · 下车</button></div>`, 'score-mode');$('#finishTripExit').onclick=()=>playCarExitSequence(carId,dest,driver,together,final,parking.result)
}
function playCarExitSequence(carId,dest,driver,together,score,parkingResult){
 const car=state.cars[carId],passenger=carPartner(driver),el=carOverlay(`<div class="car10-exit-bg"></div><div class="car10-exit-stage"><div class="car10-exit-copy"><h1>${CAR_ROUTES[dest].name}</h1><p id="exitStep">车辆已停稳。</p></div><div class="car10-exit-car"><img src="${car.model}"><div class="car10-door driver" id="exitDoor"></div><div class="car10-door passenger" id="exitPassengerDoor"></div></div><img class="car10-exit-person driver hidden" id="exitDriver" src="${carActorImg(driver)}"><img class="car10-exit-person passenger hidden" id="exitPassenger" src="${carActorImg(passenger)}"><div class="car10-exit-actions"><button class="mama-btn" id="exitEngine">① 熄火</button><button class="mama-btn" id="exitBelt" disabled>② 解安全带</button><button class="mama-btn" id="exitDoorBtn" disabled>③ 开门下车</button></div></div>`, 'exit-mode');let engineOff=false,beltOff=false;
 $('#exitEngine').onclick=()=>{engineOff=true;stopEngineSound();$('#exitEngine').disabled=true;$('#exitBelt').disabled=false;$('#exitStep').textContent='引擎熄火。';driveTone(260,.08,.035,'sine')};
 $('#exitBelt').onclick=()=>{if(!engineOff)return;beltOff=true;$('#exitBelt').disabled=true;$('#exitDoorBtn').disabled=false;$('#exitStep').textContent='安全带解开。';driveTone(620,.06,.04,'sine')};
 $('#exitDoorBtn').onclick=()=>{if(!beltOff)return;$('#exitDoor').classList.add('open');$('#exitStep').textContent=`${carPersonName(driver)} 打开车门下车…`;setTimeout(()=>{$('#exitDriver').classList.remove('hidden');$('#exitDriver').classList.add('out');if(together){$('#exitPassengerDoor').classList.add('open');$('#exitPassenger').classList.remove('hidden');$('#exitPassenger').classList.add('out')}},500);setTimeout(()=>{$('#exitDoor').classList.remove('open');$('#exitPassengerDoor').classList.remove('open');completeCarTrip(carId,dest,driver,together,score,parkingResult)},1550)}
}
function completeCarTrip(carId,dest,driver,together,score,parkingResult){document.querySelector('.car10-overlay')?.remove();recordEvent('driveCar',1);if(together)addLove(score>=85?3:2,'一起出门');save();arriveByCar(carId,dest,driver,together,score,parkingResult)}

function arriveByCar(carId,dest,driver,together,score,parkingResult){if(OUTING_DESTINATIONS[dest]){state.lastArrivalCarId=carId;save();openOutingLocation(dest,true);return}if(dest==='lake'){state.room='lake';showGame();toast('开到湖边了 ♡');return}if(dest==='fuel'){openRefuelGame(carId);return}if(dest==='wash'){openCarWashGame(carId);return}if(dest==='cafe'){adjustNeeds(driver,{mood:+8});if(together){adjustNeeds(carPartner(driver),{mood:+8});addLove(4,'Café 小约会')}modal('湖景 Café ☕',`<p>${together?'两个人一起':'你'}顺利到达 Café。驾驶 ${score}/100 · ${parkingResult}</p><button class="small-button" id="cafeDrink">买饮料 · 20 Coins</button>`);$('#cafeDrink').onclick=()=>{if(state.coins<20){toast('Coins 不够');return}state.coins-=20;adjustNeeds(driver,{mood:+5,hunger:-4});save();renderTaskUI();toast('喝饮料 ♡')};return}openDriveShop(carId,driver,together)}
function openDriveShop(carId,driver,together){const car=state.cars[carId];modal('城市超市 🛒',`<p>买到的东西会先放进 <b>${car.plate}</b> 的后备箱，不会瞬间传送到冰箱。</p><div class="grid"><button class="card" data-buy="groceries">🥚 基础食材箱 · 120</button><button class="card" data-buy="seeds">🌱 种子包 ×8 · 70</button><button class="card" data-buy="bait">🎣 普通鱼饵 ×8 · 55</button><button class="card" data-buy="premium">🪱 高级鱼饵 ×2 · 100</button><button class="card" data-buy="pet">🐾 宠物食品 · 60</button></div><button class="small-button secondary" id="openBootAfterShop">查看后备箱</button>`);document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const type=b.dataset.buy,cost={groceries:120,seeds:70,bait:55,premium:100,pet:60}[type],label={groceries:'基础食材箱',seeds:'种子包 ×8',bait:'普通鱼饵 ×8',premium:'高级鱼饵 ×2',pet:'宠物食品'}[type];if(state.coins<cost){toast('Coins 不够');return}state.coins-=cost;car.storage.boot.push({type,label,qty:1});save();renderTaskUI();toast(`${label} 已放进后备箱`) });$('#openBootAfterShop').onclick=()=>openCarStorage(carId,'boot')}
function openCarStorage(carId,focus='boot',back=null){const car=state.cars[carId],areas=[['boot','后备箱'],['backSeat','后座'],['glove','手套箱'],['cups','杯架']];modal(`${car.plate} · 车内收纳`, `<div class="car10-storage-tabs">${areas.map(([id,n])=>`<button data-storage="${id}" class="${id===focus?'active':''}">${n}</button>`).join('')}</div><div id="carStorageList"></div>${state.room==='garage'?'<button class="small-button" id="unloadBoot">把后备箱购物搬进家里</button>':''}`);const render=a=>{focus=a;document.querySelectorAll('[data-storage]').forEach(b=>b.classList.toggle('active',b.dataset.storage===a));const list=car.storage[a]||[];$('#carStorageList').innerHTML=list.length?`<div class="car10-storage-list">${list.map((it,i)=>`<div><span>📦</span><b>${it.label||it.type}</b><small>×${it.qty||1}</small></div>`).join('')}</div>`:'<p class="empty-note">这里是空的。</p>'};document.querySelectorAll('[data-storage]').forEach(b=>b.onclick=()=>render(b.dataset.storage));$('#unloadBoot')?.addEventListener('click',()=>unloadCarBoot(carId));render(focus)}
function unloadCarBoot(carId){const car=state.cars[carId],items=[...car.storage.boot];if(!items.length){toast('后备箱没有购物');return}for(const it of items){if(it.type==='groceries')Object.entries(DEFAULT_FRIDGE).forEach(([id,n])=>state.fridge[id]=Math.max(state.fridge[id]||0,Math.ceil(n*.85)));if(it.type==='seeds')state.seeds+=8;if(it.type==='bait')state.bait+=8;if(it.type==='premium')state.premiumBait+=2;if(it.type==='pet'){adjustNeeds('dudu',{hunger:-20});adjustNeeds('bubu',{hunger:-20})}}car.storage.boot=[];save();toast('购物已经搬进家里 ♡');$('#modalRoot').innerHTML=''}

function openRefuelGame(carId){const car=state.cars[carId];let fuelType='RON95',step=0,spent=0,hold=false,timer=null,startFuel=car.fuel;const draw=()=>{modal(`加油 · ${car.plate}`,`<div class="car10-refuel"><img src="${car.model}"><div class="car10-refuel-steps"><span class="${step>=0?'on':''}">1 打开油箱盖</span><span class="${step>=1?'on':''}">2 选择油品</span><span class="${step>=2?'on':''}">3 插入油枪</span><span class="${step>=3?'on':''}">4 加油</span></div><div id="refuelBody"></div></div>`);const body=$('#refuelBody');if(step===0){body.innerHTML='<button class="mama-btn" id="fuelDoor">打开油箱盖</button>';$('#fuelDoor').onclick=()=>{step=1;draw()}}else if(step===1){body.innerHTML='<p>选择油品</p><button class="mama-btn" data-fueltype="RON95">RON 95</button> <button class="mama-btn secondary" data-fueltype="RON97">RON 97</button>';document.querySelectorAll('[data-fueltype]').forEach(b=>b.onclick=()=>{fuelType=b.dataset.fueltype;step=2;draw()})}else if(step===2){body.innerHTML=`<p>${fuelType} · 把油枪插进去。</p><button class="mama-btn" id="insertNozzle">插入油枪</button>`;$('#insertNozzle').onclick=()=>{step=3;draw()}}else{body.innerHTML=`${carMeter('当前油量',car.fuel,'⛽')}<p>按住油枪加油。${fuelType==='RON97'?'RON97 稍贵。':'RON95 日常使用即可。'}</p><button class="mama-btn hold" id="fuelHold">按住加油</button><b id="fuelCost">本次 ${spent} Coins</b>`;const b=$('#fuelHold'),rate=fuelType==='RON97'?1.35:1;b.onpointerdown=e=>{hold=true;b.setPointerCapture?.(e.pointerId);timer=setInterval(()=>{if(car.fuel>=100||state.coins<=0){stop();return}car.fuel=Math.min(100,car.fuel+1.3);if(Math.random()<.45*rate){state.coins--;spent++}$('#fuelCost').textContent=`油量 ${Math.round(car.fuel)}% · 本次 ${spent} Coins`;save()},85)};const stop=()=>{if(!hold)return;hold=false;clearInterval(timer);if(car.fuel>startFuel){recordEvent('refuelCar',1);save();renderTaskUI();toast(`加油完成 · ${Math.round(car.fuel)}%`)}};b.onpointerup=stop;b.onpointercancel=stop}};draw()}

function openCarWashGame(carId){const car=state.cars[carId];if(state.coins<25){toast('洗车用品需要 25 Coins');return}state.coins-=25;save();const steps=[['喷水','💦'],['泡沫','🫧'],['刷洗','🧽'],['冲水','🚿'],['擦干','🧻'],['玻璃','🪟'],['吸尘','🧹']];let si=0,total=0;const run=()=>{const [name,tool]=steps[si],el=carOverlay(`<div class="car10-wash"><h1>洗车 · ${name}</h1><p>${si+1}/7 · 在 Lexus 上来回移动工具到 100%</p><div class="car10-wash-car" id="washSurface"><img src="${car.model}"><div class="car10-wash-overlay step-${si}" id="washVisual"></div><span class="car10-wash-tool" id="washTool">${tool}</span></div><div class="gesture-progress"><i id="washProgress"></i></div><b id="washPct">0%</b></div>`, 'wash10-mode'),surf=$('#washSurface'),toolEl=$('#washTool'),vis=$('#washVisual');let last=null,dist=0,done=false;surf.onpointerdown=e=>{surf.setPointerCapture?.(e.pointerId);last=[e.clientX,e.clientY]};surf.onpointermove=e=>{if(!last||done)return;const r=surf.getBoundingClientRect();toolEl.style.left=(e.clientX-r.left-24)+'px';toolEl.style.top=(e.clientY-r.top-24)+'px';dist+=Math.hypot(e.clientX-last[0],e.clientY-last[1]);last=[e.clientX,e.clientY];const pct=Math.min(100,dist/850*100);$('#washProgress').style.width=pct+'%';$('#washPct').textContent=Math.round(pct)+'%';vis.style.opacity=si===1?Math.min(.75,pct/100):Math.max(0,.7-pct/140);if(pct>=100){done=true;total+=pct;setTimeout(()=>{el.remove();si++;if(si<steps.length)run();else{car.clean=100;recordEvent('washCar',1);save();renderTaskUI();modal('洗车完成 ✨',`<div class="drive-result"><img src="${car.model}"><h2>Perfect Shine</h2><p>外观、玻璃和车内都清理好了。</p></div>`) }},350)}}};run()}


/* ==========================================================
   MASTER 2.7 — CAR GAMEPLAY 2.0
   Keeps MASTER 2.6.2 clean character mode locked.
   Adds: difficulty profiles, richer traffic/rules, lane/speed
   scoring, new road events, parking sensors + stricter parking.
   ========================================================== */
Object.assign(CAR_ROUTES.lake,{speedLimit:70,traffic:'light',road:'山路'});
Object.assign(CAR_ROUTES.store,{speedLimit:60,traffic:'busy',road:'市区'});
Object.assign(CAR_ROUTES.fuel,{speedLimit:60,traffic:'light',road:'市区'});
Object.assign(CAR_ROUTES.wash,{speedLimit:60,traffic:'normal',road:'市区'});
Object.assign(CAR_ROUTES.cafe,{speedLimit:60,traffic:'normal',road:'湖区'});
Object.assign(CAR_ROUTES.supermarket,{speedLimit:60,traffic:'busy',road:'市区'});
Object.assign(CAR_ROUTES.gym,{speedLimit:60,traffic:'normal',road:'市区'});
Object.assign(CAR_ROUTES.park,{speedLimit:50,traffic:'light',road:'住宅区'});
Object.assign(CAR_ROUTES.cinema,{speedLimit:60,traffic:'busy',road:'市区'});
Object.assign(CAR_ROUTES.ski,{speedLimit:65,traffic:'normal',road:'山路'});
Object.assign(CAR_ROUTES.amusement,{speedLimit:60,traffic:'busy',road:'景区'});
Object.assign(CAR_ROUTES.restaurant,{speedLimit:60,traffic:'normal',road:'市区'});
Object.assign(CAR_ROUTES.mall,{speedLimit:60,traffic:'busy',road:'市区'});
Object.assign(CAR_ROUTES.convenience,{speedLimit:50,traffic:'light',road:'住宅区'});

const CAR2_PROFILES={
 easy:{label:'轻松',sub:'三车道辅助 · 自动限速 · 最容易控制',traffic:.82,eventGap:.78,penalty:.55,steer:.48,grip:1.18,parkTol:1.32,maxSpeed:95,centerAssist:.965,laneAssist:true,smartLimit:true},
 normal:{label:'标准',sub:'三车道辅助 · 有事件和奖励 · 推荐',traffic:1.00,eventGap:.62,penalty:.82,steer:.58,grip:1.12,parkTol:1.18,maxSpeed:108,centerAssist:.974,laneAssist:true,smartLimit:true},
 hard:{label:'挑战',sub:'自由转向 · 车流更多 · 规则更严格',traffic:1.30,eventGap:.54,penalty:1.22,steer:.86,grip:1.0,parkTol:.90,maxSpeed:142,centerAssist:.990,laneAssist:false,smartLimit:false}
};
const CAR2_EVENT_TYPES=['redLight','speedCamera','speedBump','slowCar','pedestrian','roadwork','merge','turn','rain','schoolZone','cyclist','emergency','pothole'];

function car2Profile(){const k=state.carSettings?.difficulty||'normal';return CAR2_PROFILES[k]||CAR2_PROFILES.normal}
function car2DifficultyPicker(){const current=state.carSettings?.difficulty||'normal';return `<div class="car20-difficulty"><b>驾驶难度</b>${Object.entries(CAR2_PROFILES).map(([id,p])=>`<button data-car2-diff="${id}" class="${id===current?'active':''}"><strong>${p.label}</strong><small>${p.sub}</small></button>`).join('')}</div>`}

function openDriveDestinations(carId,driver,together){
 const car=state.cars[carId];
 modal('Car Gameplay 2.0 · 选择目的地',`<div class="route-head"><img src="${car.model}"><div><b>${car.plate}</b><p>司机：${carPersonName(driver)} ${together?'· 乘客：'+carPersonName(carPartner(driver)):'· 单独出门'}</p><small>完整流程：上车 → 安全带 → START → 驾驶 → 停车 → 熄火下车。</small></div></div>${car2DifficultyPicker()}<div class="destination-grid car10-dest-grid car20-dest-grid">${Object.entries(CAR_ROUTES).map(([id,r])=>`<button class="destination-card" data-dest="${id}"><span>${r.icon}</span><b>${r.name}</b><small>${r.km} km · ${r.road||r.difficulty}<br>限速约 ${r.speedLimit||60} · 停车 ${r.parking}<br>${r.desc}</small></button>`).join('')}</div>`);
 document.querySelectorAll('[data-car2-diff]').forEach(b=>b.onclick=()=>{state.carSettings.difficulty=b.dataset.car2Diff;save();document.querySelectorAll('[data-car2-diff]').forEach(x=>x.classList.toggle('active',x===b))});
 document.querySelectorAll('[data-dest]').forEach(b=>b.onclick=()=>prepareCarTrip(carId,b.dataset.dest,driver,together));
}

function startCarDrive10(carId,dest,driver,together,tripInit){
 const car=state.cars[carId],route=CAR_ROUTES[dest],profile=car2Profile(),night=new Date().getHours()>=19||new Date().getHours()<6;
 stopEngineSound();startEngineSound();
 let camera=state.carSettings.camera||'third',gear='D',speed=0,lateral=0,steer=0,curve=0,targetCurve=0,progress=0,last=performance.now(),alive=true,signal='off',headlights=night,wipers=false,handbrake=false,rain=(state.weather==='小雨'||state.weather==='阵雨'),event=null,eventIndex=0,nextEventKm=.55+Math.random()*.25,traffic=[],trafficTimer=0,passengerTimer=0,stoppedRed=0,currentLimit=route.speedLimit||60,frontGap=999,crashLockUntil=0,nextCheckpoint=.55;
 const laneSlots=[-.72,0,.72];let laneIndex=1,laneTarget=0,lastLaneRequest=0,bonusTimer=2.8,bonuses=[];
 const metrics={safety:100,smooth:100,rules:100,lane:100,speedScore:100,following:100,signalGood:0,signalNeed:0,collisions:0,hardBrakes:0,redStops:0,curb:0,eventsGood:0,eventsBad:0,points:0,combo:0,bestCombo:0,checkpoints:0,bonuses:0,laneChanges:0,nearMisses:0};
 const microChallenges=[{id:'lane',label:'保持 CENTER 6 秒',need:6},{id:'speed',label:'限速内稳定驾驶 7 秒',need:7},{id:'gap',label:'保持安全车距 6 秒',need:6}];
 let microIndex=Math.abs(hashString(dest))%microChallenges.length,microTimer=0;
 const keys={},controls={gas:false,brake:false,left:false,right:false};
 const destInfo=OUTING_DESTINATIONS[dest]||{name:route.name,icon:route.icon,preview:'./assets/cars/ui28/destination-cafe.jpg',desc:route.desc};
 const destPreview=destInfo.preview||'./assets/cars/ui28/destination-cafe.jpg';
 const driverName=carPersonName(driver),passengerName=carPersonName(carPartner(driver));
 const weatherLabel=state.weather||'晴天';
 const el=carOverlay(`${carCameraMarkup(car,driver,together,camera)}
 <header class="car28-topbar">
   <div class="car28-brand"><strong>Shawn & Elyn ♡</strong><small>Our Little World</small></div>
   <div class="car28-slogan">More Places, More Memories ♡</div>
   <nav class="car28-navtabs">
     <button class="active">🚗<span>Drive</span></button>
     <button data-car28-menu="Explore">📍<span>Explore</span></button>
     <button data-car28-menu="Shop">🛍️<span>Shop</span></button>
     <button data-car28-menu="Get Fit">🏋️<span>Get Fit</span></button>
     <button data-car28-menu="Eat">🍴<span>Eat</span></button>
     <button data-car28-menu="Play">🎮<span>Play</span></button>
     <button data-car28-menu="Date">📷<span>Date</span></button>
   </nav>
 </header>
 <aside class="car28-left-stack">
   <div class="car28-route-card"><span class="big">${route.icon}</span><div><b>Drive to ${destInfo.name}</b><small>${route.desc}</small></div></div>
   <div class="car28-info-card"><span>⏱️</span><div><small>ETA</small><b id="car2Eta">--</b><em>${route.km} km</em></div></div>
   <div class="car28-info-card"><span>🏎️</span><div><small>Speed</small><b><i id="driveSpeed">0</i> km/h</b><em>Speed Limit <strong id="car2Limit">${currentLimit}</strong></em></div></div>
   <div class="car28-info-card"><span>🚗</span><div><small>Follow Distance</small><b id="car2Gap" class="ok">SAFE</b><em class="car28-gap-bars"><i></i><i></i><i></i><i></i></em></div></div>
   <div class="car28-info-card"><span>🚦</span><div><small>Traffic Light</small><b id="car28Traffic" class="ok">✓ Clear</b><em id="driveSignalText">SIGNAL OFF</em></div></div>
   <div class="car28-info-card"><span>☀️</span><div><small>Weather</small><b>${weatherLabel}</b><em>${rain?'Wet road':'Comfort drive'}</em></div></div>
 </aside>
 <section class="car28-destination-panel">
   <h3>Destination</h3>
   <img class="car28-dest-photo" src="${destPreview}" onerror="this.src='./assets/cars/ui28/destination-cafe.jpg'">
   <h2>${destInfo.name}</h2>
   <p>${destInfo.desc||route.desc} ♡</p>
   <button id="car28ViewDetails">View Details</button>
   <img class="car28-mini-map" src="./assets/outing/city-map.jpg">
 </section>
 <div class="car10-nav car28-live-nav"><b id="driveEventTitle">导航：继续直行</b><span id="driveEventHint">限速 ${currentLimit} · 保持车道和安全距离</span></div>
 <div class="car10-drive-message car28-toast" id="driveMessage">W/↑ 油门 · S/↓ 刹车 · A/D 转向 · Q/E 方向灯</div>
 <div class="car28-steering">
   <button data-car10="left" aria-label="left">◀</button>
   <div class="car28-wheel" id="driveWheel"><span>♡</span></div>
   <button data-car10="right" aria-label="right">▶</button>
 </div>
 <div class="car28-pedals">
   <button data-car10="brake" class="brake"><span>▤</span><b>Brake</b></button>
   <button data-car10="gas" class="accel"><span>▤</span><b>Accel</b></button>
 </div>
 <section class="car28-bottom-zone">
   <div class="car28-camera-tabs">
     <button data-camera-mode="third" class="active">📷<span>Third Person</span></button>
     <button data-camera-mode="first">📷<span>First Person</span></button>
     <button data-camera-mode="reverse">📷<span>Reverse</span></button>
   </div>
   <div class="car28-couple-card">
     <div><img src="${carActorImg(driver)}"><b>${driverName}</b><span>♡</span></div>
     <p>Driving Together<br><em>To More Places ♡</em></p>
     ${together?`<div><img src="${carActorImg(carPartner(driver))}"><b>${passengerName}</b><span>♡</span></div>`:''}
   </div>
   <div class="car28-score-live">
     <header><b>🏅 Driving Score <em id="car29Points">0 pts</em></b><strong id="car28ScoreTotal">100/100</strong></header>
     <div class="car292-goals"><span id="car292GoalBonus">💗 Bonus 0/3</span><span id="car292GoalEvents">✅ Events 0/2</span><span id="car292GoalCrash">🛡️ No Crash</span></div>
     <div><span>🛡️<b id="car28ScoreSafety">100</b><small>Safety</small></span><span>📋<b id="car28ScoreRules">100</b><small>Rules</small></span><span>🛣️<b id="car28ScoreLane">100</b><small>Lane</small></span><span>🏎️<b id="car28ScoreSpeed">100</b><small>Speed</small></span><span>↔️<b id="car28ScoreSignals">100</b><small>Signals</small></span><span>🔥<b id="car29Combo">x1</b><small>Combo</small></span></div>
     <div class="car291-challenge"><span>🎯</span><b id="car291Challenge">${microChallenges[microIndex].label}</b><i id="car291ChallengeBar"></i></div>
   </div>
   <div class="car28-parking-next"><div><b>🅿️ Parking Challenge (Next)</b><span>Park in the marked spot at ${destInfo.name}!</span></div><img src="./assets/cars/ui28/parking-preview.jpg"></div>
 </section>
 <div class="car292-points-float" id="car292PointsFloat">🏆 0 pts</div>
 <div class="car292-crash" id="car292Crash">💥 CRASH · STOP</div>
 <div class="car292-bonus-layer" id="car292BonusLayer"></div>
 <div class="car28-tools">
   <button id="gearControl">D / R</button><button id="signalLeft">↙</button><button id="signalRight">↘</button><button id="cameraControl">📷</button><button id="hornControl">📣</button><button id="lightControl">💡</button><button id="wiperControl">🌧️</button><button id="handbrakeControl">P</button>
 </div>
 <div class="car28-telemetry"><span>⛽ <b id="driveFuel">${Math.round(car.fuel)}%</b></span><span>🛠️ <b id="driveCondition">${Math.round(car.condition)}%</b></span><span>⭐ <b id="driveSafety">100</b></span><span>🛣️ <b id="driveDistance">0.0/${route.km}</b></span><span>车道 <b id="car2Lane">CENTER</b></span><span>档位 <b id="driveGear">D</b></span></div>
 <button class="drive-exit car28-exit" id="driveAbort">结束驾驶</button>`, 'drive10-mode car20-mode car28-mode');
 el.dataset.difficulty=(state.carSettings?.difficulty||'normal');
 const cam=$('#carCamera');
 const roadCanvas=$('#car29RoadCanvas'),roadCtx=roadCanvas?.getContext('2d'),playerCar=$('#car29PlayerCar'),backdrop=$('#car29Backdrop');
 let roadFlow=0,visualClock=0,worldScenery=[];
 const resizeRoadCanvas=()=>{if(!roadCanvas||!roadCtx)return;const r=roadCanvas.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1),w=Math.max(1,Math.round(r.width*d)),h=Math.max(1,Math.round(r.height*d));if(roadCanvas.width!==w||roadCanvas.height!==h){roadCanvas.width=w;roadCanvas.height=h;roadCtx.setTransform(d,0,0,d,0,0)}};
 const roadPoint=(z,lane=0)=>{const w=roadCanvas?.clientWidth||1,h=roadCanvas?.clientHeight||1,hor=h*.29,t=Math.max(0,Math.min(1,z)),p=Math.pow(t,1.62),halfTop=w*.075,halfBottom=w*.46,half=halfTop+(halfBottom-halfTop)*Math.pow(t,1.14),center=w*.5+curve*w*.035-lateral*w*.018;return{x:center+lane*half,y:hor+p*(h-hor),half,p}};
 const addWorldScenery=()=>{const count=2+Math.floor(Math.random()*2);for(let i=0;i<count;i++)worldScenery.push({z:.02+Math.random()*.05,side:Math.random()<.5?-1:1,type:randomFrom(['tree','lamp','flower','house']),variant:Math.random()})};
 const drawTree=(ctx,x,y,s,flower=false)=>{ctx.save();ctx.translate(x,y);ctx.fillStyle='#5f4a3c';ctx.fillRect(-s*.05,-s*.35,s*.10,s*.42);ctx.fillStyle=flower?'#ef9fb0':'#6b9b69';for(const [dx,dy,rr] of [[0,-.52,.24],[-.18,-.45,.18],[.19,-.43,.18],[0,-.33,.20]]){ctx.beginPath();ctx.arc(dx*s,dy*s,rr*s,0,Math.PI*2);ctx.fill()}ctx.restore()};
 const drawLamp=(ctx,x,y,s)=>{ctx.save();ctx.strokeStyle='#2c3437';ctx.lineWidth=Math.max(1,s*.035);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-s*.65);ctx.stroke();ctx.fillStyle='#ffe5a6';ctx.beginPath();ctx.arc(x,y-s*.69,s*.09,0,Math.PI*2);ctx.fill();ctx.restore()};
 const drawHouse=(ctx,x,y,s,v)=>{ctx.save();ctx.translate(x,y);ctx.fillStyle=v>.5?'#efc5ae':'#f4d8c4';ctx.fillRect(-s*.28,-s*.42,s*.56,s*.42);ctx.fillStyle='#9a6658';ctx.beginPath();ctx.moveTo(-s*.34,-s*.42);ctx.lineTo(0,-s*.68);ctx.lineTo(s*.34,-s*.42);ctx.closePath();ctx.fill();ctx.fillStyle='#8ac0d0';ctx.fillRect(-s*.17,-s*.31,s*.12,s*.13);ctx.fillRect(s*.05,-s*.31,s*.12,s*.13);ctx.restore()};
 const drawDynamicWorld=(dt)=>{if(!roadCanvas||!roadCtx)return;resizeRoadCanvas();const w=roadCanvas.clientWidth,h=roadCanvas.clientHeight,ctx=roadCtx;ctx.clearRect(0,0,w,h);const hor=h*.29,center=w*.5+curve*w*.035-lateral*w*.018,topHalf=w*.075,bottomHalf=w*.46;
   roadFlow=(roadFlow+Math.max(0,speed)*dt*.0075)%1;visualClock+=dt;
   const sideGrad=ctx.createLinearGradient(0,hor,0,h);sideGrad.addColorStop(0,'rgba(233,221,204,.88)');sideGrad.addColorStop(1,'rgba(206,187,166,.98)');
   ctx.fillStyle=sideGrad;ctx.beginPath();ctx.moveTo(0,hor);ctx.lineTo(center-topHalf,hor);ctx.lineTo(center-bottomHalf,h);ctx.lineTo(0,h);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(w,hor);ctx.lineTo(center+topHalf,hor);ctx.lineTo(center+bottomHalf,h);ctx.lineTo(w,h);ctx.closePath();ctx.fill();
   const roadGrad=ctx.createLinearGradient(0,hor,0,h);roadGrad.addColorStop(0,'#747779');roadGrad.addColorStop(.6,'#66696c');roadGrad.addColorStop(1,'#56595c');ctx.fillStyle=roadGrad;ctx.beginPath();ctx.moveTo(center-topHalf,hor);ctx.lineTo(center+topHalf,hor);ctx.lineTo(center+bottomHalf,h);ctx.lineTo(center-bottomHalf,h);ctx.closePath();ctx.fill();
   // warm edge lines
   for(const side of [-1,1]){ctx.strokeStyle='rgba(250,239,208,.92)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(center+side*topHalf,hor);ctx.lineTo(center+side*bottomHalf,h);ctx.stroke()}
   // lane dashes move toward the player with speed
   for(const lane of [-1/3,1/3]){for(let i=0;i<15;i++){const z=((i/15+roadFlow)%1),z2=Math.min(1,z+.038+.045*z),a=roadPoint(z,lane),b=roadPoint(z2,lane);ctx.strokeStyle=`rgba(255,248,222,${.30+.65*z})`;ctx.lineWidth=1+z*6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
   // cross-road texture bands make forward motion obvious
   for(let i=0;i<9;i++){const z=((i/9+roadFlow*.68)%1),p=roadPoint(z,0);ctx.strokeStyle=`rgba(255,255,255,${.018+.035*z})`;ctx.lineWidth=1+z*2;ctx.beginPath();ctx.moveTo(p.x-p.half*.97,p.y);ctx.lineTo(p.x+p.half*.97,p.y);ctx.stroke()}
   // world scenery moves from horizon to foreground
   const move=Math.max(0,speed)*dt*.00135;
   if(speed>1&&Math.random()<Math.min(.35,dt*(1.5+speed/18)))addWorldScenery();
   for(const o of worldScenery){o.z+=move*(.72+o.variant*.55);const p=roadPoint(o.z,o.side*1.28),s=10+o.z*115,x=p.x+o.side*(12+o.z*34),y=p.y;if(o.type==='tree')drawTree(ctx,x,y,s,o.variant>.58);else if(o.type==='lamp')drawLamp(ctx,x,y,s*.82);else if(o.type==='house')drawHouse(ctx,x,y,s*.8,o.variant);else drawTree(ctx,x,y,s*.72,true)}
   worldScenery=worldScenery.filter(o=>o.z<1.12);
   // subtle speed streaks only at higher speeds
   if(speed>70){ctx.strokeStyle=`rgba(255,255,255,${Math.min(.12,(speed-70)/500)})`;for(let i=0;i<8;i++){const side=i%2?-1:1,x=side<0?Math.random()*w*.18:w*(.82+Math.random()*.18),y=hor+Math.random()*(h-hor);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+side*18,y+22);ctx.stroke()}}
   if(playerCar){const xShift=lateral*58;playerCar.style.transform=`translateX(calc(-50% + ${xShift}px)) rotate(${steer*2.8-curve*1.5}deg) translateY(${Math.sin(visualClock*9)*Math.min(2.2,speed/45)}px)`;playerCar.style.setProperty('--car-speed',Math.min(1,speed/120))}
   if(backdrop){const zoom=1.012+Math.min(.028,speed/5000),bx=curve*-10-lateral*4,by=-Math.min(8,speed/24);backdrop.style.transform=`translate(${bx}px,${by}px) scale(${zoom})`}
 };
 const setCamera=c=>{camera=c;state.carSettings.camera=c;cam.classList.remove('car10-third','car10-first','car10-reverse');cam.classList.add('car10-'+c);document.querySelectorAll('[data-camera-mode]').forEach(b=>b.classList.toggle('active',b.dataset.cameraMode===c));save()};setCamera(camera);
 document.querySelectorAll('[data-camera-mode]').forEach(b=>b.onclick=()=>setCamera(b.dataset.cameraMode));
 document.querySelectorAll('[data-car28-menu]').forEach(b=>b.onclick=()=>flashDrive('🚗 驾驶中 · 到达目的地后再打开 '+b.dataset.car28Menu));
 if($('#car28ViewDetails'))$('#car28ViewDetails').onclick=()=>flashDrive(`${destInfo.icon||route.icon} ${destInfo.name} · ${destInfo.desc||route.desc}`);
 const cycleCamera=()=>setCamera(camera==='third'?'first':camera==='first'?'reverse':'third');
 const flashDrive=t=>{const m=$('#driveMessage');if(!m)return;m.textContent=t;m.classList.add('alert');clearTimeout(m._t);m._t=setTimeout(()=>{m.classList.remove('alert');m.textContent=profile.laneAssist?'W/↑ 油门 · S/↓ 刹车 · A/D 轻按换车道 · Q/E 方向灯':'W/↑ 油门 · S/↓ 刹车 · A/D 自由转向 · Q/E 方向灯'},1450)};
 const passengerReact=(kind='calm')=>{if(!together)return;const b=$('#passengerBubble'),p=$('#passengerProp'),box=$('#drivePassenger');if(!b)return;b.textContent=randomFrom(COUPLE_CAR_LINES[kind]||COUPLE_CAR_LINES.calm);p.textContent=kind==='phone'?'📱':kind==='drink'?'🧋':kind==='sleep'?'💤':'';box.className='car10-drive-passenger '+kind;clearTimeout(box._t);box._t=setTimeout(()=>{box.className='car10-drive-passenger';b.textContent='';p.textContent=''},4200)};
 const toggleGear=()=>{if(speed>3){flashDrive('先完全停稳再换 D/R');return}gear=gear==='D'?'R':'D';$('#driveGear').textContent=gear;$('#gearControl').textContent=gear==='D'?'D / R':'R / D';if(gear==='R')setCamera('reverse');else if(camera==='reverse')setCamera('third');driveTone(350,.06,.04,'sine')};
 const setSignal=s=>{signal=signal===s?'off':s;$('#driveSignalText').textContent=signal==='off'?'SIGNAL OFF':signal==='left'?'⬅ LEFT SIGNAL':'RIGHT SIGNAL ➡';$('#driveSignalText').className=signal==='off'?'':'on '+signal;driveTone(720,.05,.03,'sine')};
 const horn=()=>{driveTone(230,.22,.09,'square');flashDrive('📣 BEEP!')};
 const toggleLights=()=>{headlights=!headlights;$('#lightControl').classList.toggle('active',headlights);cam.classList.toggle('headlights',headlights);flashDrive(headlights?'车灯开启':'车灯关闭')};
 const toggleWipers=()=>{wipers=!wipers;$('#wiperControl').classList.toggle('active',wipers);$('#wiperLayer').classList.toggle('on',wipers);flashDrive(wipers?'雨刷开启':'雨刷关闭')};
 const toggleHandbrake=()=>{handbrake=!handbrake;$('#handbrakeControl').classList.toggle('active',handbrake);flashDrive(handbrake?'手刹 ON':'手刹 OFF')};
 const requestLane=dir=>{if(!profile.laneAssist)return;const now=performance.now();if(now-lastLaneRequest<180)return;lastLaneRequest=now;const next=Math.max(0,Math.min(2,laneIndex+dir));if(next===laneIndex){flashDrive(next===0?'已经在最左车道':'已经在最右车道');return}laneIndex=next;laneTarget=laneSlots[laneIndex];metrics.laneChanges++;driveTone(520,.05,.02,'sine');flashDrive(`↔️ 换到 ${laneIndex===0?'LEFT':laneIndex===1?'CENTER':'RIGHT'} 车道`)};
 document.querySelectorAll('[data-car10]').forEach(b=>{const k=b.dataset.car10;b.onpointerdown=e=>{b.setPointerCapture?.(e.pointerId);if(profile.laneAssist&&(k==='left'||k==='right')){requestLane(k==='left'?-1:1);controls[k]=false}else controls[k]=true};b.onpointerup=()=>controls[k]=false;b.onpointercancel=()=>controls[k]=false});
 $('#gearControl').onclick=toggleGear;$('#signalLeft').onclick=()=>setSignal('left');$('#signalRight').onclick=()=>setSignal('right');$('#cameraControl').onclick=cycleCamera;$('#hornControl').onclick=horn;$('#lightControl').onclick=toggleLights;$('#wiperControl').onclick=toggleWipers;$('#handbrakeControl').onclick=toggleHandbrake;
 const kd=e=>{const k=e.key.toLowerCase();if(profile.laneAssist&&(k==='a'||k==='arrowleft'||k==='d'||k==='arrowright')){if(!e.repeat)requestLane((k==='a'||k==='arrowleft')?-1:1);keys[k]=false;return}keys[k]=true;if(k==='g')toggleGear();if(k==='q')setSignal('left');if(k==='e')setSignal('right');if(k==='c')cycleCamera();if(k==='h')horn();if(k==='l')toggleLights();if(k==='x')toggleWipers();if(e.code==='Space'){e.preventDefault();toggleHandbrake()}};const ku=e=>{keys[e.key.toLowerCase()]=false};window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);
 const cleanup=()=>{window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku);stopEngineSound();el.remove()};$('#driveAbort').onclick=()=>{alive=false;cleanup();toast('已结束驾驶')};
 const trafficBase=route.traffic==='busy'?1.22:route.traffic==='light'?.76:1;
 const spawnTraffic=()=>{const root=$('#carTraffic');if(!root)return;const node=document.createElement('div');const lane=randomFrom([-0.72,0,.72])+(Math.random()-.5)*.12;const tone=randomFrom(['rose','blue','silver','charcoal','cream']);node.className='car10-traffic car29-traffic-car '+tone;node.innerHTML='<i class="glass"></i><i class="tail l"></i><i class="tail r"></i><i class="wheel wl"></i><i class="wheel wr"></i>';root.appendChild(node);traffic.push({node,lane,z:0,hit:false,pace:.55+Math.random()*.4})};
 const spawnBonus=()=>{const root=$('#car292BonusLayer');if(!root)return;const lane=randomFrom(laneSlots),kind=randomFrom(['heart','coin','star']),node=document.createElement('div');node.className='car292-bonus '+kind;node.textContent=kind==='heart'?'💗':kind==='coin'?'🪙':'⭐';root.appendChild(node);bonuses.push({node,lane,z:0,kind,done:false})};
 const updateTripGoals=()=>{if($('#car292GoalBonus'))$('#car292GoalBonus').textContent=`💗 Bonus ${Math.min(3,metrics.bonuses)}/3`;if($('#car292GoalEvents'))$('#car292GoalEvents').textContent=`✅ Events ${Math.min(2,metrics.eventsGood)}/2`;if($('#car292GoalCrash')){$('#car292GoalCrash').textContent=metrics.collisions?'💥 Crashed':'🛡️ No Crash';$('#car292GoalCrash').classList.toggle('bad',metrics.collisions>0)}};

 const setEventLimit=n=>{currentLimit=n;$('#car2Limit').textContent=n};
 const makeEvent=()=>{eventIndex++;let type=CAR2_EVENT_TYPES[(hashString(dest)+eventIndex*5+Math.floor(Math.random()*3))%CAR2_EVENT_TYPES.length];if(type==='rain'&&rain)type='pothole';if(dest==='ski'&&eventIndex===1)type='rain';if((dest==='supermarket'||dest==='store'||dest==='mall')&&eventIndex===1)type='redLight';if(dest==='park'&&eventIndex===1)type='schoolZone';const side=Math.random()<.5?'left':'right';event={type,side,distance:235,resolved:false,green:false,stopped:false};const title=$('#driveEventTitle'),hint=$('#driveEventHint'),root=$('#carRoadEvent');root.innerHTML='';const n=document.createElement('div');n.className='car10-road-event '+type;root.appendChild(n);setEventLimit(route.speedLimit||60);
   if(type==='redLight'){title.textContent='🚦 前方红灯';hint.textContent='停止线前完全停下，等绿灯';n.innerHTML='<div class="car10-light"><i class="red"></i><i></i><i></i></div><div class="car10-stopline"></div>';setTimeout(()=>{if(event&&event.type==='redLight'){event.green=true;n.classList.add('green');title.textContent='🟢 绿灯';hint.textContent='确认安全后继续'}},2800+Math.random()*1100)}
   else if(type==='speedCamera'){setEventLimit(50);title.textContent='📷 测速区';hint.textContent='限速 50 km/h';n.innerHTML='<div class="car10-sign">📷<b>50</b></div>'}
   else if(type==='speedBump'){setEventLimit(25);title.textContent='⚠️ 减速带';hint.textContent='降到 25 km/h 以下';n.innerHTML='<div class="car10-bump"></div>'}
   else if(type==='slowCar'){title.textContent='🚙 慢车在前';hint.textContent='保持距离；变道要先打方向灯';n.innerHTML='<div class="car10-event-car">🚙</div>'}
   else if(type==='pedestrian'){setEventLimit(30);title.textContent='🚶 行人过马路';hint.textContent='减速并停车让行';n.innerHTML='<div class="car10-crossing">🚶</div>'}
   else if(type==='roadwork'){setEventLimit(40);title.textContent='🚧 施工封道';hint.textContent=`打${side==='left'?'左':'右'}灯并提前靠${side==='left'?'左':'右'}`;n.innerHTML='<div class="car10-cones">🚧 🚧 🚧</div>'}
   else if(type==='merge'){title.textContent='↔️ 车道汇流';hint.textContent=`打${side==='left'?'左':'右'}灯，控制速度汇入`;n.innerHTML='<div class="car10-sign">↔️<b>MERGE</b></div>'}
   else if(type==='turn'){setEventLimit(45);title.textContent=`↪️ 前方${side==='left'?'左':'右'}转`;hint.textContent=`提前打${side==='left'?'左':'右'}灯并降速`;n.innerHTML=`<div class="car10-sign">${side==='left'?'↩️':'↪️'}<b>TURN</b></div>`}
   else if(type==='rain'){rain=true;title.textContent='🌧️ 突然下雨';hint.textContent='打开雨刷；湿地刹车距离更长';cam.classList.add('raining');n.innerHTML='<div class="car10-sign">🌧️<b>WET ROAD</b></div>';passengerReact('calm')}
   else if(type==='schoolZone'){setEventLimit(30);title.textContent='🏫 学校区域';hint.textContent='限速 30，留意小朋友';n.innerHTML='<div class="car10-sign">🏫<b>30</b></div>'}
   else if(type==='cyclist'){setEventLimit(45);title.textContent='🚲 前方骑行者';hint.textContent='减速，保持距离后再安全变道';n.innerHTML='<div class="car10-crossing">🚲</div>'}
   else if(type==='emergency'){setEventLimit(45);title.textContent='🚑 后方急救车';hint.textContent='减速并靠左/右让出通道';n.innerHTML='<div class="car10-sign">🚑<b>GIVE WAY</b></div>'}
   else if(type==='pothole'){setEventLimit(35);title.textContent='🕳️ 前方坑洞';hint.textContent=`减速并轻微靠${side==='left'?'左':'右'}避开`;n.innerHTML='<div class="car20-pothole">🕳️</div>'}
   metrics.signalNeed+=['roadwork','merge','turn','slowCar','cyclist'].includes(type)?1:0;
 };
 const updatePointHud=()=>{const pts=Math.round(metrics.points);if($('#car29Points'))$('#car29Points').textContent=pts+' pts';if($('#car292PointsFloat'))$('#car292PointsFloat').textContent='🏆 '+pts+' pts';if($('#car29Combo'))$('#car29Combo').textContent='x'+Math.max(1,metrics.combo);const c=microChallenges[microIndex];if($('#car291Challenge'))$('#car291Challenge').textContent=c.label;if($('#car291ChallengeBar'))$('#car291ChallengeBar').style.width=Math.min(100,microTimer/c.need*100)+'%';updateTripGoals()};
 const awardPoints=(amount,msg='')=>{metrics.combo=Math.min(5,metrics.combo+1);metrics.bestCombo=Math.max(metrics.bestCombo,metrics.combo);const gain=Math.round(amount*(1+(metrics.combo-1)*.12));metrics.points+=gain;updatePointHud();if(msg)flashDrive(`+${gain} pts · ${msg} · COMBO x${metrics.combo}`)};
 const breakCombo=(loss=0)=>{if(loss)metrics.points=Math.max(0,metrics.points-loss);metrics.combo=0;updatePointHud()};
 const goodEvent=msg=>{metrics.eventsGood++;awardPoints(90,msg);driveTone(760,.06,.03,'sine')};
 const badEvent=(pen,msg)=>{pen*=profile.penalty;metrics.eventsBad++;metrics.rules=Math.max(0,metrics.rules-pen);metrics.safety=Math.max(0,metrics.safety-pen*.68);breakCombo(Math.round(pen*4));flashDrive(msg+' · COMBO RESET');driveTone(110,.15,.08)};
 const resolveEvent=()=>{if(!event||event.resolved)return;event.resolved=true;const t=event.type,correctSignal=signal===event.side;
   if(t==='redLight'){if(!event.green){badEvent(25,'🚦 闯红灯！');state.coins=Math.max(0,state.coins-15)}else if(event.stopped){metrics.redStops++;car.stats.redStops++;goodEvent('红灯停车正确')}else badEvent(6,'绿灯前没有完整停车')}
   if(t==='speedCamera'){speed>55?badEvent(12,'📷 超速通过测速区'):goodEvent('测速区控制正确')}
   if(t==='speedBump'){if(speed>30){badEvent(12,'💥 减速带太快');car.condition=Math.max(0,car.condition-2);speed*=.62;passengerReact('brake')}else goodEvent('平稳通过减速带')}
   if(t==='slowCar'){if(frontGap>28||speed<50||Math.abs(lateral)>.5){if(Math.abs(lateral)>.5&&signal==='off')badEvent(5,'变道没有打灯');else goodEvent('安全处理慢车')}else badEvent(10,'跟车距离太近')}
   if(t==='pedestrian'){speed<6?goodEvent('礼让行人'):badEvent(18,'🚶 没有停车让行')}
   if(['roadwork','merge','turn'].includes(t)){if(correctSignal){metrics.signalGood++;goodEvent('方向灯使用正确')}else badEvent(7,'该打方向灯');if(t==='roadwork'&&Math.sign(lateral)!==(event.side==='left'?-1:1)&&Math.abs(lateral)<.48){badEvent(10,'🚧 进入封闭区域');car.condition=Math.max(0,car.condition-3)}if(t==='turn'&&speed>52)badEvent(7,'转弯速度太快')}
   if(t==='rain'){wipers?goodEvent('雨刷开启及时'):badEvent(6,'下雨没有开雨刷')}
   if(t==='schoolZone'){speed<=34?goodEvent('学校区域慢行'):badEvent(15,'🏫 学校区域超速')}
   if(t==='cyclist'){if(speed<48&&frontGap>20){if(Math.abs(lateral)>.45&&signal==='off')badEvent(6,'超越骑行者没打灯');else{if(Math.abs(lateral)>.45)metrics.signalGood++;goodEvent('安全通过骑行者')}}else badEvent(12,'🚲 离骑行者太近')}
   if(t==='emergency'){if(speed<48&&Math.abs(lateral)>.55)goodEvent('正确让急救车先行');else badEvent(10,'🚑 没有及时让出通道')}
   if(t==='pothole'){if(speed<40&&Math.sign(lateral)===(event.side==='left'?-1:1))goodEvent('避开坑洞');else{badEvent(8,'🕳️ 压到坑洞');car.condition=Math.max(0,car.condition-1.5);passengerReact('brake')}}
   signal='off';$('#driveSignalText').textContent='SIGNAL OFF';$('#driveSignalText').className='';$('#carRoadEvent').innerHTML='';setEventLimit(route.speedLimit||60);nextEventKm=progress+profile.eventGap*(.75+Math.random()*.55);event=null;setTimeout(()=>{if($('#driveEventTitle')){$('#driveEventTitle').textContent='导航：继续直行';$('#driveEventHint').textContent=`限速 ${currentLimit} · 保持车道和安全距离`}},600)
 };
 const finishRoad=()=>{alive=false;save();cleanup();startParkingGame10(carId,dest,driver,together,metrics)};
 if(night){cam.classList.add('night-driving');if(headlights)cam.classList.add('headlights')}if(rain)cam.classList.add('raining');
 const loop=now=>{if(!alive)return;const dt=Math.min(.045,(now-last)/1000);last=now;drawDynamicWorld(dt);const crashLocked=now<crashLockUntil;const gas=!crashLocked&&(keys['w']||keys['arrowup']||controls.gas),brake=!crashLocked&&(keys['s']||keys['arrowdown']||controls.brake),left=!crashLocked&&(keys['a']||keys['arrowleft']||controls.left),right=!crashLocked&&(keys['d']||keys['arrowright']||controls.right);
   const oldSpeed=speed;if(crashLocked){speed=0;steer*=.62}else if(handbrake)speed=Math.max(0,speed-96*dt);else{if(gas)speed+=gear==='D'?30*dt:22*dt;else speed-=3.2*dt;if(brake)speed-=58*dt*(rain?.88:1)}speed=Math.max(0,Math.min(gear==='D'?profile.maxSpeed:30,speed));const hardDecel=(oldSpeed-speed)/Math.max(dt,.001);if(!crashLocked&&hardDecel>68&&oldSpeed>42){metrics.hardBrakes++;metrics.smooth=Math.max(0,metrics.smooth-dt*16*profile.penalty);if(together&&Math.random()<.25)passengerReact('brake')}
   const steerInput=(right?1:0)-(left?1:0);const grip=(rain?.80:1)*profile.grip;if(profile.laneAssist){const err=laneTarget-lateral;steer+=(Math.max(-.58,Math.min(.58,err*1.28))-steer)*Math.min(1,dt*6.2);lateral+=err*Math.min(1,dt*(speed<18?3.0:4.2));lateral-=curve*speed*.00012*dt}else{steer+=(steerInput-steer)*dt*(speed<25?3.0:2.1)*profile.steer;steer=Math.max(-.72,Math.min(.72,steer));lateral+=steer*(.18+.0062*speed)*dt*grip*(gear==='R'?-1:1);lateral-=curve*speed*.00032*dt;if(Math.abs(steerInput)<.1)lateral*=Math.pow(profile.centerAssist||.984,dt*60)}lateral=Math.max(-1.32,Math.min(1.32,lateral));if(Math.random()<dt*.070)targetCurve=(Math.random()-.5)*(route.road==='山路'?1.12:.78);curve+=(targetCurve-curve)*dt*.36;
   const curveLimit=Math.abs(curve)>.65?45:Math.abs(curve)>.38?55:(route.speedLimit||60);const effectiveLimit=Math.min(currentLimit,curveLimit);if(profile.smartLimit&&speed>effectiveLimit+3)speed=Math.max(effectiveLimit+1,speed-22*dt);if(speed>effectiveLimit+8){metrics.speedScore=Math.max(0,metrics.speedScore-dt*5*profile.penalty);metrics.safety=Math.max(0,metrics.safety-dt*2.6*profile.penalty)}if(Math.abs(lateral)>.82){metrics.lane=Math.max(0,metrics.lane-dt*5*profile.penalty)}if(Math.abs(lateral)>1.05){metrics.safety=Math.max(0,metrics.safety-dt*8*profile.penalty);car.condition=Math.max(0,car.condition-dt*.7);metrics.curb++;if(Math.abs(lateral)>1.34)speed*=.991}
   if(night&&!headlights){metrics.safety=Math.max(0,metrics.safety-dt*2.5);cam.classList.add('dark-vision')}else cam.classList.remove('dark-vision');if(rain&&!wipers){metrics.safety=Math.max(0,metrics.safety-dt*1.8);cam.classList.add('rain-blur')}else cam.classList.remove('rain-blur');
   if(gear==='D')progress+=speed*dt/3600;else progress=Math.max(0,progress-speed*dt/7200);car.fuel=Math.max(0,car.fuel-speed*dt*.00042);car.clean=Math.max(0,car.clean-dt*.010*(1+speed/100)*(rain?1.8:1));revEngine(speed/(profile.maxSpeed||140));if(!event&&progress>=nextEventKm&&progress<route.km-.45)makeEvent();if(event){event.distance-=Math.max(1,speed)*dt*.42;const n=$('.car10-road-event');if(n){const z=Math.max(.18,1-event.distance/240);n.style.transform=`translate(-50%,-50%) scale(${.38+z*1.15})`;n.style.top=(16+z*60)+'%'}if(event.type==='redLight'&&!event.green&&event.distance<34&&speed<4){stoppedRed+=dt;event.stopped=stoppedRed>.45}else if(event.type==='pedestrian'&&event.distance<34&&speed<4)event.stopped=true;if(event.distance<=0)resolveEvent()}
   bonusTimer-=dt;if(bonusTimer<=0&&speed>12){bonusTimer=4.2+Math.random()*3.2;spawnBonus()}bonuses.forEach(b=>{b.z+=dt*(.16+speed/205);const p=Math.min(1.18,b.z),px=50+b.lane*29/(1.1-Math.min(.95,p)*.48)+curve*9,py=17+p*70;b.node.style.left=px+'%';b.node.style.top=py+'%';b.node.style.transform=`translate(-50%,-50%) scale(${.38+p*.95})`;if(!b.done&&p>.80&&p<1.05&&Math.abs(b.lane-lateral)<.28){b.done=true;metrics.bonuses++;awardPoints(b.kind==='star'?80:b.kind==='coin'?55:45,b.kind==='star'?'星星奖励':b.kind==='coin'?'金币路线奖励':'情侣爱心');b.node.classList.add('collected');setTimeout(()=>b.node.remove(),180)}if(p>1.16&&!b.done){b.node.remove();b.done=true}});for(let i=bonuses.length-1;i>=0;i--)if(bonuses[i].done)bonuses.splice(i,1);
   trafficTimer+=dt;const spawnEvery=(1.95-Math.min(.5,speed/260))/(trafficBase*profile.traffic);if(trafficTimer>spawnEvery){trafficTimer=0;spawnTraffic()}frontGap=999;traffic.forEach(t=>{t.z+=dt*(.12+speed/240)*t.pace;const p=Math.min(1.18,t.z),px=50+t.lane*29/(1.1-Math.min(.95,p)*.48)+curve*9,py=15+p*74;t.node.style.left=px+'%';t.node.style.top=py+'%';t.node.style.transform=`translate(-50%,-50%) scale(${.28+p*1.0})`;if(Math.abs(t.lane-lateral)<.34&&p>.45&&p<1.05)frontGap=Math.min(frontGap,(1.05-p)*95);if(!t.hit&&p>.81&&p<1.05&&Math.abs(t.lane-lateral)<.34){t.hit=true;metrics.collisions++;car.stats.collisions++;metrics.safety=Math.max(0,metrics.safety-24*profile.penalty);car.condition=Math.max(0,car.condition-8);speed=0;steer=0;crashLockUntil=now+1900;controls.gas=controls.brake=controls.left=controls.right=false;breakCombo(180);t.node.classList.add('hit');const crashEl=$('#car292Crash');if(crashEl){crashEl.classList.add('show');setTimeout(()=>crashEl.classList.remove('show'),1700)}flashDrive('💥 撞车！车辆完全停止 · 先重新观察再继续');passengerReact('brake');driveTone(85,.22,.11,'square')}if(!t.hit&&!t.nearMiss&&p>1.02&&p<1.12){const d=Math.abs(t.lane-lateral);if(d>=.34&&d<.50){t.nearMiss=true;metrics.nearMisses++;awardPoints(30,'Near Miss 安全闪避')}}if(p>1.2){t.node.remove();t.dead=true}});for(let i=traffic.length-1;i>=0;i--)if(traffic[i].dead)traffic.splice(i,1);if(frontGap<22&&speed>45){metrics.following=Math.max(0,metrics.following-dt*7*profile.penalty);metrics.safety=Math.max(0,metrics.safety-dt*3*profile.penalty)}
   if(progress>=nextCheckpoint&&progress<route.km-.12){metrics.checkpoints++;awardPoints(65,'通过路线检查点');nextCheckpoint+=.55}
   const mission=microChallenges[microIndex];let missionOK=false;if(mission.id==='lane')missionOK=Math.abs(lateral)<.34&&speed>18;else if(mission.id==='speed')missionOK=speed>22&&speed<=effectiveLimit+3;else if(mission.id==='gap')missionOK=speed>18&&frontGap>35;if(missionOK)microTimer+=dt;else microTimer=Math.max(0,microTimer-dt*.7);if(microTimer>=mission.need){awardPoints(140,'完成挑战：'+mission.label);microIndex=(microIndex+1)%microChallenges.length;microTimer=0}updatePointHud();
   passengerTimer+=dt;if(together&&passengerTimer>10+Math.random()*8){passengerTimer=0;passengerReact(randomFrom(['calm','phone','drink','sleep']))}
   const road=$('#carRoad');if(road)road.style.transform=`perspective(720px) rotateZ(${curve*1.1}deg) translateX(${curve*18-lateral*8}px)`;const wheel=$('#driveWheel');if(wheel)wheel.style.transform=`rotate(${steer*48-curve*10}deg)`;$('#driveSpeed').textContent=Math.round(speed);$('#driveGear').textContent=gear;$('#driveFuel').textContent=Math.round(car.fuel)+'%';$('#driveCondition').textContent=Math.round(car.condition)+'%';$('#driveSafety').textContent=Math.round(metrics.safety);$('#driveDistance').textContent=`${Math.min(route.km,progress).toFixed(1)}/${route.km}`;$('#car2Lane').textContent=profile.laneAssist?(laneIndex===0?'LEFT':laneIndex===1?'CENTER':'RIGHT'):(Math.abs(lateral)<.42?'CENTER':lateral<0?'LEFT':'RIGHT');$('#car2Lane').className=Math.abs(lateral-(profile.laneAssist?laneTarget:lateral))<.20?'ok':Math.abs(lateral)<.95?'warn':'danger';$('#car2Gap').textContent=frontGap>35?'SAFE':frontGap>20?'CLOSE':'BRAKE';$('#car2Gap').className=frontGap>35?'ok':frontGap>20?'warn':'danger';const remain=Math.max(0,route.km-progress),eta=speed>12?Math.ceil(remain/Math.max(25,speed)*60):'--';$('#car2Eta').textContent=eta==='--'?'--':eta+' min';cam.style.setProperty('--lateral',lateral);cam.style.setProperty('--curve',curve);
   const sigScore=metrics.signalNeed?Math.min(100,metrics.signalGood/metrics.signalNeed*100):100,liveTotal=Math.round((metrics.safety+metrics.rules+metrics.lane+metrics.speedScore+sigScore)/5);
   if($('#car28ScoreTotal'))$('#car28ScoreTotal').textContent=liveTotal+'/100';if($('#car28ScoreSafety'))$('#car28ScoreSafety').textContent=Math.round(metrics.safety);if($('#car28ScoreRules'))$('#car28ScoreRules').textContent=Math.round(metrics.rules);if($('#car28ScoreLane'))$('#car28ScoreLane').textContent=Math.round(metrics.lane);if($('#car28ScoreSpeed'))$('#car28ScoreSpeed').textContent=Math.round(metrics.speedScore);if($('#car28ScoreSignals'))$('#car28ScoreSignals').textContent=Math.round(sigScore);if($('#car28Traffic')){$('#car28Traffic').textContent=event?.type==='redLight'?(event.green?'✓ Green':'● Red'):frontGap<20?'⚠ Busy':'✓ Clear';$('#car28Traffic').className=event?.type==='redLight'&&!event.green?'danger':frontGap<20?'warn':'ok'};
   if(car.fuel<=0){alive=false;cleanup();state.coins=Math.max(0,state.coins-80);save();modal('没油了 😵','<p>道路救援扣除 80 Coins。下次出发前先检查油量。</p>');return}if(progress>=route.km){finishRoad();return}requestAnimationFrame(loop)
 };requestAnimationFrame(loop)
}

function startParkingGame10(carId,dest,driver,together,metrics){
 const car=state.cars[carId],profile=car2Profile(),difficulty=CAR_ROUTES[dest].parking,cfg=PARKING_CONFIG[difficulty],tgt=cfg.target;let x=22,y=77,angle=difficulty==='SPECIAL'?90:0,speed=0,gear='D',steer=0,alive=true,last=performance.now(),collisions=0,curb=false,elapsed=0,camera='top';const keys={},controls={gas:false,brake:false,left:false,right:false};
 const el=carOverlay(`<div class="car10-parking-lot car20-parking-lot" id="parkingLot"><div class="car10-parking-curb top"></div><div class="car10-parking-curb bottom"></div><div class="car10-parking-target" style="left:${tgt.x}%;top:${tgt.y}%;width:${tgt.w}%;height:${tgt.h}%;transform:translate(-50%,-50%) rotate(${tgt.angle}deg)"><span>${cfg.label}</span></div>${cfg.obstacles.map((o,i)=>`<div class="car10-park-obstacle" style="left:${o.x}%;top:${o.y}%;width:${o.w}%;height:${o.h}%"><span>${i%2?'🚙':'🚗'}</span></div>`).join('')}<div class="car10-parking-car" id="parkingCar"><img src="${car.model}"><b>${car.plate}</b></div></div><div class="car10-parking-hud car20-parking-hud"><div><span>Parking 2.0 · ${profile.label}</span><h2>${difficulty==='SPECIAL'?'平行停车':difficulty==='HARD'?'倒车入库':'停车入位'}</h2><p>慢速控制最重要。接近障碍物时停车雷达会提示。</p></div><div class="car10-park-stats"><span>档位 <b id="parkGear">D</b></span><span>速度 <b id="parkSpeed">0</b></span><span>角度 <b id="parkAngle">0°</b></span><span>碰撞 <b id="parkHits">0</b></span></div><div class="car20-park-sensor"><span>雷达</span><b id="parkSensor">SAFE</b><i id="parkSensorBar"></i></div></div><div class="car10-parking-controls"><button data-park10="left">←</button><button data-park10="gas">油门</button><button id="parkGearBtn">D/R</button><button data-park10="brake">刹车</button><button data-park10="right">→</button><button id="parkCameraBtn">📷 TOP</button><button class="finish" id="finishParking">完成停车</button></div><button class="drive-exit" id="parkAbort">放弃停车</button>`, 'parking10-mode car20-parking-mode');
 const kd=e=>{keys[e.key.toLowerCase()]=true;if(e.key.toLowerCase()==='g')toggleGear()};const ku=e=>keys[e.key.toLowerCase()]=false;window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);document.querySelectorAll('[data-park10]').forEach(b=>{const k=b.dataset.park10;b.onpointerdown=e=>{controls[k]=true;b.setPointerCapture?.(e.pointerId)};b.onpointerup=()=>controls[k]=false;b.onpointercancel=()=>controls[k]=false});
 const toggleGear=()=>{if(Math.abs(speed)>1.5){toast('先完全停稳再换挡');return}gear=gear==='D'?'R':'D';$('#parkGear').textContent=gear;$('#parkGearBtn').textContent=gear==='D'?'D/R':'R/D';driveTone(340,.06,.04,'sine')};$('#parkGearBtn').onclick=toggleGear;
 $('#parkCameraBtn').onclick=()=>{camera=camera==='top'?'reverse':'top';$('#parkCameraBtn').textContent=camera==='top'?'📷 TOP':'📷 REVERSE';$('#parkingLot').classList.toggle('reverse-cam',camera==='reverse')};
 const cleanup=()=>{window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku);el.remove()};$('#parkAbort').onclick=()=>{alive=false;cleanup();openCarGarage(carId,driver)};
 const rectOverlap=(cx,cy,w,h,o)=>Math.abs(cx-o.x)<(w+o.w)/2&&Math.abs(cy-o.y)<(h+o.h)/2;
 const distToObstacle=()=>{let best=99;for(const o of cfg.obstacles)best=Math.min(best,Math.hypot(x-o.x,y-o.y)-Math.max(o.w,o.h)*.42);best=Math.min(best,y-5,95-y);return best};
 const evaluate=()=>{const dx=(x-tgt.x)/(tgt.w*.5),dy=(y-tgt.y)/(tgt.h*.5),tol=.75*profile.parkTol,inside=Math.abs(dx)<=tol&&Math.abs(dy)<=tol;let ad=Math.abs(((angle-tgt.angle+180)%360)-180);if(ad>180)ad=360-ad;const perfectAngle=8*profile.parkTol,goodAngle=17*profile.parkTol;let result='TOO FAR',score=25;if(curb){result='HIT CURB';score=32}else if(inside&&ad<=perfectAngle&&collisions===0&&elapsed<80){result='PERFECT';score=100}else if(inside&&ad<=goodAngle){result='GOOD';score=84-Math.min(24,collisions*9)-Math.min(8,elapsed/30)}else if(inside){result='CROOKED';score=58-Math.min(18,collisions*7)}else if(Math.hypot(dx,dy)<1.28*profile.parkTol){result='TOO FAR';score=45}else score=25;return{result,score:Math.max(0,Math.round(score)),inside,angleDiff:Math.round(ad)}};
 $('#finishParking').onclick=()=>{if(Math.abs(speed)>1.5){toast('先把车完全停稳');return}const r=evaluate();if(!r.inside&&r.result==='TOO FAR'){toast('车还没真正进停车位，继续调整');return}alive=false;metrics.parking=r.score;metrics.parkingResult=r.result;metrics.parkingHits=collisions;metrics.parkingTime=Math.round(elapsed);if(r.result==='PERFECT'){car.stats.perfectParks++;if(together)passengerCarComment(carPartner(driver),'parkGood')}else if(together)passengerCarComment(carPartner(driver),'parkBad');cleanup();showCarTripScore(carId,dest,driver,together,metrics,r)};
 const loop=now=>{if(!alive)return;const dt=Math.min(.04,(now-last)/1000);last=now;elapsed+=dt;const gas=keys['w']||keys['arrowup']||controls.gas,brake=keys['s']||keys['arrowdown']||controls.brake,left=keys['a']||keys['arrowleft']||controls.left,right=keys['d']||keys['arrowright']||controls.right;if(gas)speed+=14*dt;else speed*=Math.pow(.955,dt*60);if(brake)speed-=25*dt;speed=Math.max(0,Math.min(profile===CAR2_PROFILES.easy?9:profile===CAR2_PROFILES.hard?14:11,speed));const si=(right?1:0)-(left?1:0);steer+=(si-steer)*dt*5.4;const dir=gear==='D'?1:-1,rad=(angle-90)*Math.PI/180;x+=Math.cos(rad)*speed*dt*dir*.53;y+=Math.sin(rad)*speed*dt*dir*.53;angle+=steer*speed*dt*dir*2.1*profile.steer;x=Math.max(4,Math.min(96,x));y=Math.max(5,Math.min(95,y));if(y<8||y>92){curb=true;speed*=.3;metrics.curb++;car.condition=Math.max(0,car.condition-.5)}for(const o of cfg.obstacles){if(rectOverlap(x,y,9,6,o)&&speed>.15){collisions++;car.condition=Math.max(0,car.condition-2);speed=0;x-=Math.cos(rad)*1.3*dir;y-=Math.sin(rad)*1.3*dir;driveTone(100,.13,.08)}}const sensor=distToObstacle(),sensorText=sensor<5?'STOP':sensor<10?'VERY CLOSE':sensor<18?'CLOSE':'SAFE';$('#parkSensor').textContent=sensorText;$('#parkSensor').className=sensor<5?'danger':sensor<18?'warn':'ok';$('#parkSensorBar').style.width=Math.max(5,Math.min(100,100-sensor*4))+'%';if(sensor<10&&Math.floor(elapsed*4)%2===0)driveTone(sensor<5?880:620,.035,.014,'sine');const pc=$('#parkingCar');pc.style.left=x+'%';pc.style.top=y+'%';pc.style.transform=`translate(-50%,-50%) rotate(${angle}deg)`;$('#parkSpeed').textContent=speed.toFixed(1);$('#parkAngle').textContent=Math.round(((angle%360)+360)%360)+'°';$('#parkHits').textContent=collisions;requestAnimationFrame(loop)};requestAnimationFrame(loop)
}

function showCarTripScore(carId,dest,driver,together,metrics,parking){
 const car=state.cars[carId],signalScore=metrics.signalNeed?Math.min(100,metrics.signalGood/metrics.signalNeed*100):100,lane=Math.round(metrics.lane??100),speedScore=Math.round(metrics.speedScore??100),following=Math.round(metrics.following??100),road=Math.round(metrics.safety*.28+metrics.smooth*.14+metrics.rules*.20+signalScore*.10+lane*.12+speedScore*.10+following*.06),final=Math.max(0,Math.min(100,Math.round(road*.74+parking.score*.26))),grade=final>=93?'S':final>=85?'A':final>=72?'B':final>=58?'C':'D';const goals=(metrics.bonuses>=3?1:0)+(metrics.eventsGood>=2?1:0)+(metrics.collisions===0?1:0),stars=Math.max(1,goals),rewardCoins=stars===3?45:stars===2?25:10,rewardXP=stars===3?35:stars===2?20:10;state.coins+=rewardCoins;state.xpTotal+=rewardXP;car.stats.bestScore=Math.max(car.stats.bestScore||0,final);car.stats.trips=(car.stats.trips||0)+1;car.mileage+=CAR_ROUTES[dest].km;car.last=CAR_ROUTES[dest].name;car.stats.bestLane=Math.max(car.stats.bestLane||0,lane);save();
 const el=carOverlay(`<div class="car10-score-card car20-score-card"><img src="${car.model}"><span class="car10-grade grade-${grade}">${grade}</span><h1>CAR 2.1 SCORE · ${final}/100</h1><p>${CAR_ROUTES[dest].name} · ${car2Profile().label}模式 · ${parking.result}</p><div class="car291-final-points"><b>🏆 ${Math.round(metrics.points||0)} pts · ${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}</b><span>Bonus ${metrics.bonuses||0} · Near Miss ${metrics.nearMisses||0} · Best Combo x${Math.max(1,metrics.bestCombo||0)}</span><strong>奖励 +${rewardCoins}🪙 +${rewardXP}XP</strong></div><div class="car20-score-grid"><div><b>${Math.round(metrics.safety)}</b><span>安全</span></div><div><b>${Math.round(metrics.rules)}</b><span>规则</span></div><div><b>${lane}</b><span>车道</span></div><div><b>${speedScore}</b><span>限速</span></div><div><b>${following}</b><span>跟车</span></div><div><b>${Math.round(signalScore)}</b><span>方向灯</span></div><div><b>${parking.score}</b><span>停车</span></div></div><div class="car10-score-notes"><span>碰撞 ${metrics.collisions}</span><span>急刹 ${metrics.hardBrakes}</span><span>红灯正确停车 ${metrics.redStops}</span><span>路肩 ${metrics.curb}</span><span>停车 ${metrics.parkingTime||0}s</span><span>事件 ✓${metrics.eventsGood} / ✕${metrics.eventsBad}</span></div><button class="mama-btn" id="finishTripExit">熄火 · 下车</button></div>`, 'score-mode car20-score-mode');$('#finishTripExit').onclick=()=>playCarExitSequence(carId,dest,driver,together,final,parking.result)
}


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
$('#continueBtn').onclick=()=>{state.started=true;ensureAudio();showGame()};$('#newBtn').onclick=()=>{localStorage.removeItem('worldRebuild1');location.reload()};$('#albumBtn').onclick=()=>openSimple('相册','之后会收录钓鱼、种花、约会、情侣互动和生活照片。');$('#settingsBtn').onclick=openSoundSettings;$('#taskBookBtn').onclick=()=>openTaskHandbook('daily');$('#outingBtn').onclick=()=>openOutingMap();$('#musicBtn').onclick=toggleBgm;$('#mapBtn').onclick=openMap;$('#closeMapBtn').onclick=showGame;$('#switchBtn').onclick=switchActor;$('#coopBtn').onclick=openCoopPanel;$('#sendChatBtn').onclick=()=>sendTypedChat();$('#phoneBtn').onclick=openChatHistory;$('#bagBtn').onclick=()=>{const li=levelInfo(),l=loveInfo();openSimple('背包 & 成长',`🪙 <b>${state.coins} Coins</b>：买东西，会花掉。<br>✨ <b>Lv.${li.level} · ${li.inLevel}/${li.need} EXP</b>：升级，不会花掉。<br>❤️ <b>${state.love}/1000 · ${l.name}</b>：情侣关系。<br><br>🌱 种子 ${state.seeds} · 🎣 鱼饵 ${state.bait}`)};
function clock(){const d=new Date(),h=d.getHours(),m=String(d.getMinutes()).padStart(2,'0');$('#clockText').textContent=`${String(h).padStart(2,'0')}:${m} ${h<12?'早上':h<18?'下午':'晚上'}`}
buildTabs();buildMap();clock();applyNeedsElapsed();initTasks();initExtendedTasks();renderNeedsUI();renderMapHud();renderOutfitSprites();renderCoopStatus();updateMusicButton();
setInterval(()=>{clock();applyNeedsElapsed();initTasksIfNeededOnly();renderTaskUI();renderNeedsUI();renderMapHud();needComment();save();},30000);
requestAnimationFrame(keyboardLoop);if(state.started)showGame();

/* MASTER 2.9 — LIVE MOVING ROAD: canvas road + scenery flow + real moving traffic + player car */

/* MASTER 2.9.1 — BALANCED DRIVING: easier steering, full-stop collisions, live points/combo, micro challenges */

/* MASTER 2.9.2 — EASY + FUN DRIVING: tap-to-change-lane assist, smart speed limiter, collectible bonuses, route goals, stars/rewards, near-miss bonus */


/* =========================================================
   MASTER 3.0 — RACING GAME 1.0
   Real continuous steering, AI opponents, laps, position,
   braking for curves, collision slowdown, off-road slowdown,
   slipstream, finish ranking.
   ========================================================= */

const RACE30_TRACKS={
  lakeside:{
    id:'lakeside',
    name:'Lakeside Sprint',
    icon:'🌊',
    laps:3,
    lapMeters:920,
    subtitle:'湖边高速赛 · 连续弯 + 长直路',
    desc:'真正的赛车玩法：直路加速、弯前刹车、保持路线并超越 AI。',
    curveStrength:1.0
  }
};
const RACE30_DIFFICULTY={
  easy:{id:'easy',label:'ROOKIE',ai:.89,grip:1.10,reward:.78},
  normal:{id:'normal',label:'PRO',ai:1.0,grip:1.0,reward:1},
  hard:{id:'hard',label:'EXPERT',ai:1.075,grip:.93,reward:1.30}
};

function race30FmtTime(sec){
  sec=Math.max(0,Number(sec)||0);
  const m=Math.floor(sec/60),s=sec-m*60;
  return `${m}:${s.toFixed(2).padStart(5,'0')}`;
}
function race30CurveAt(track,meters){
  const u=((meters%track.lapMeters)+track.lapMeters)%track.lapMeters/track.lapMeters;
  // Intentional track layout: straight -> sweep -> S -> hairpin -> final sweep.
  let c=0;
  if(u<.14)c=0;
  else if(u<.29)c=Math.sin((u-.14)/.15*Math.PI)*.52;
  else if(u<.43)c=-Math.sin((u-.29)/.14*Math.PI)*.64;
  else if(u<.56)c=Math.sin((u-.43)/.13*Math.PI)*.30;
  else if(u<.72)c=-Math.sin((u-.56)/.16*Math.PI)*.86;
  else if(u<.84)c=0;
  else c=Math.sin((u-.84)/.16*Math.PI)*.48;
  return c*(track.curveStrength||1);
}
function race30RecommendedSpeed(track,meters){
  const c=Math.abs(race30CurveAt(track,meters+55));
  if(c>.72)return 76;
  if(c>.50)return 96;
  if(c>.28)return 122;
  return 178;
}
function openRace30Hub(carId,driver=state.active,together=true){
  const car=state.cars[carId];
  const diff=state.racing?.difficulty||'normal';
  modal('🏁 Racing Circuit',`
    <div class="race30-hub">
      <div class="race30-car-card">
        <img src="${car.model}" alt="${car.name}">
        <div><b>${car.name}</b><strong>${car.plate}</strong>
        <small>Driver · ${carPersonName(driver)}${together?` · ${carPersonName(carPartner(driver))} 为你加油 ♡`:''}</small></div>
      </div>
      <div class="race30-diff">
        <span>AI 难度</span>
        ${Object.values(RACE30_DIFFICULTY).map(d=>`<button data-race30-diff="${d.id}" class="${d.id===diff?'active':''}">${d.label}</button>`).join('')}
      </div>
      <div class="race30-track-grid">
        <button class="race30-track active" data-race30-track="lakeside">
          <div class="race30-track-art lakeside"><span>🌊</span><i>🏁</i></div>
          <b>Lakeside Sprint</b>
          <small>3 Laps · 2.76 km<br>连续转向 · AI 对手 · 弯前刹车</small>
          <em>${state.racing.bestTimes?.lakeside?`BEST ${race30FmtTime(state.racing.bestTimes.lakeside)}`:'NO RECORD'}</em>
        </button>
        <button class="race30-track locked" disabled>
          <div class="race30-track-art mountain"><span>⛰️</span></div>
          <b>Mountain Pass</b><small>下一阶段开放</small><em>COMING NEXT</em>
        </button>
        <button class="race30-track locked" disabled>
          <div class="race30-track-art night"><span>🌃</span></div>
          <b>Night City Circuit</b><small>下一阶段开放</small><em>COMING NEXT</em>
        </button>
      </div>
      <div class="race30-rules">
        <b>怎么玩</b>
        <span>W / ↑ 油门</span><span>S / ↓ 刹车</span><span>A / D 连续转向</span><span>Space 手刹</span>
        <p>直路尽量加速；看到 BRAKE 提示就提早减速。冲出赛道会严重掉速，撞 AI 也会马上掉速。</p>
      </div>
      <button class="mama-btn race30-start" id="race30Start">3 · 2 · 1 · START RACE</button>
    </div>
  `);
  let selectedDiff=diff;
  document.querySelectorAll('[data-race30-diff]').forEach(b=>b.onclick=()=>{
    selectedDiff=b.dataset.race30Diff;
    document.querySelectorAll('[data-race30-diff]').forEach(x=>x.classList.toggle('active',x===b));
  });
  $('#race30Start').onclick=()=>{
    state.racing.difficulty=selectedDiff;save();
    $('#modalRoot').innerHTML='';
    startRace30(carId,'lakeside',driver,together,selectedDiff);
  };
}

function startRace30(carId,trackId='lakeside',driver=state.active,together=true,difficulty='normal'){
  const track=RACE30_TRACKS[trackId],diff=RACE30_DIFFICULTY[difficulty]||RACE30_DIFFICULTY.normal,car=state.cars[carId];
  if(!track||!car)return;
  document.querySelector('.car10-overlay')?.remove();

  const totalMeters=track.lapMeters*track.laps;
  const el=carOverlay(`
    <div class="race30-shell">
      <div class="race30-topbar">
        <div class="race30-track-name"><span>${track.icon}</span><div><b>${track.name}</b><small>${diff.label} · ${track.laps} LAPS</small></div></div>
        <div class="race30-mainstats">
          <div><small>POSITION</small><b id="race30Pos">4 / 4</b></div>
          <div><small>LAP</small><b id="race30Lap">1 / ${track.laps}</b></div>
          <div><small>SPEED</small><b><span id="race30Speed">0</span> <i>km/h</i></b></div>
          <div><small>TIME</small><b id="race30Time">0:00.00</b></div>
        </div>
        <button type="button" class="race30-quit" id="race30Quit">退出比赛</button>
      </div>

      <div class="race30-stage">
        <canvas id="race30Canvas" width="1280" height="720"></canvas>
        <div class="race30-countdown" id="race30Countdown">3</div>
        <div class="race30-corner" id="race30Corner"><b>STRAIGHT</b><span>FULL THROTTLE</span></div>
        <div class="race30-slip" id="race30Slip">SLIPSTREAM +</div>
        <div class="race30-hit" id="race30Hit">💥 CONTACT · SPEED LOST</div>

        <div class="race30-leftpanel">
          <div><small>BEST LAP</small><b id="race30BestLap">--</b></div>
          <div><small>CURRENT LAP</small><b id="race30LapTime">0:00.00</b></div>
          <div><small>GAP AHEAD</small><b id="race30Gap">--</b></div>
        </div>

        <div class="race30-rivals" id="race30Rivals"></div>

        <div class="race30-progress">
          <i id="race30ProgressFill"></i>
          <span id="race30YouDot">YOU</span>
        </div>

        <div class="race30-player-label">
          <span>${carId==='black'?'⚫':'⚪'}</span>
          <b>${car.plate}</b>
          <small>${carPersonName(driver)}</small>
        </div>

        <div class="race30-cheer ${together?'':'hidden'}">
          <img src="${carActorImg(carPartner(driver))}">
          <span id="race30Cheer">${carPersonName(carPartner(driver))}: 加油！🏁</span>
        </div>

        <div class="race30-controls">
          <div class="race30-steer">
            <button type="button" data-r30="left">◀</button>
            <div><span>STEERING</span><i id="race30SteerBar"></i></div>
            <button type="button" data-r30="right">▶</button>
          </div>
          <button type="button" class="race30-hand" data-r30="hand">HANDBRAKE<br><small>SPACE</small></button>
          <button type="button" class="race30-pedal brake" data-r30="brake">BRAKE<br><small>S / ↓</small></button>
          <button type="button" class="race30-pedal gas" data-r30="gas">ACCEL<br><small>W / ↑</small></button>
        </div>
      </div>
    </div>
  `,'race30-mode');

  const canvas=$('#race30Canvas'),ctx=canvas.getContext('2d');
  const controls={gas:false,brake:false,left:false,right:false,hand:false};
  let alive=true,raceStarted=false,finished=false,paused=false;
  let speed=0,playerX=0,steer=0,progress=0;
  let raceTime=0,lapStart=0,bestLap=Infinity,lastLap=0;
  let collisionCooldown=0,offRoadTime=0,collisions=0;
  let lastTs=performance.now(),countValue=3,countTimer=0,cheerTimer=0;
  let flashHit=0,slipstream=false;
  const aiNames=['Mika','Noah','Rin'];
  const aiColors=['#e85d6a','#4f78d7','#f1b84c'];
  const ais=aiNames.map((name,i)=>({
    name,
    lane:[-.45,.43,0][i],
    targetLane:[-.45,.43,0][i],
    progress:-(i+1)*13,
    speed:(111+i*5)*diff.ai,
    base:(116+i*5)*diff.ai,
    color:aiColors[i],
    finished:false,
    finishTime:null,
    seed:i*2.17
  }));
  const cheerLines=['稳住，前面有弯！','可以超他了！','这圈很快！','直路踩下去！','慢一点进弯！','Nice overtake! 🏁'];

  const cleanup=()=>{
    alive=false;
    window.removeEventListener('keydown',onKD,true);
    window.removeEventListener('keyup',onKU,true);
    document.querySelectorAll('[data-r30]').forEach(b=>{
      b.onpointerdown=b.onpointerup=b.onpointercancel=null;
    });
  };
  const quit=()=>{cleanup();el.remove();openCarGarage(carId,driver)};
  $('#race30Quit').onclick=quit;

  function setControl(k,v){controls[k]=v}
  document.querySelectorAll('[data-r30]').forEach(b=>{
    const k=b.dataset.r30;
    b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture?.(e.pointerId);setControl(k,true)};
    b.onpointerup=()=>setControl(k,false);
    b.onpointercancel=()=>setControl(k,false);
  });
  function onKD(e){
    if(!alive)return;
    const k=e.key.toLowerCase();
    if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(k)){e.preventDefault();e.stopImmediatePropagation()}
    if(k==='w'||k==='arrowup')controls.gas=true;
    if(k==='s'||k==='arrowdown')controls.brake=true;
    if(k==='a'||k==='arrowleft')controls.left=true;
    if(k==='d'||k==='arrowright')controls.right=true;
    if(k===' ')controls.hand=true;
  }
  function onKU(e){
    if(!alive)return;
    const k=e.key.toLowerCase();
    if(k==='w'||k==='arrowup')controls.gas=false;
    if(k==='s'||k==='arrowdown')controls.brake=false;
    if(k==='a'||k==='arrowleft')controls.left=false;
    if(k==='d'||k==='arrowright')controls.right=false;
    if(k===' ')controls.hand=false;
  }
  window.addEventListener('keydown',onKD,true);
  window.addEventListener('keyup',onKU,true);

  function currentRank(){
    const all=[{p:progress,me:true},...ais.map(a=>({p:a.progress,me:false}))].sort((a,b)=>b.p-a.p);
    return all.findIndex(x=>x.me)+1;
  }
  function closestAhead(){
    const ahead=ais.filter(a=>a.progress>progress).sort((a,b)=>a.progress-b.progress)[0];
    return ahead?ahead.progress-progress:null;
  }
  function updateHUD(){
    const lap=Math.min(track.laps,Math.floor(Math.max(0,progress)/track.lapMeters)+1);
    $('#race30Pos').textContent=`${currentRank()} / 4`;
    $('#race30Lap').textContent=`${lap} / ${track.laps}`;
    $('#race30Speed').textContent=Math.round(speed);
    $('#race30Time').textContent=race30FmtTime(raceTime);
    $('#race30LapTime').textContent=race30FmtTime(Math.max(0,raceTime-lapStart));
    $('#race30BestLap').textContent=isFinite(bestLap)?race30FmtTime(bestLap):'--';
    const gap=closestAhead();$('#race30Gap').textContent=gap==null?'LEADER':`${gap.toFixed(0)} m`;
    $('#race30ProgressFill').style.width=`${Math.min(100,progress/totalMeters*100)}%`;
    $('#race30YouDot').style.left=`${Math.min(98,Math.max(2,progress/totalMeters*100))}%`;
    $('#race30SteerBar').style.transform=`translateX(${steer*38}px)`;
    const rec=race30RecommendedSpeed(track,progress);
    const curve=race30CurveAt(track,progress+55),corner=$('#race30Corner');
    if(Math.abs(curve)>.25){
      corner.classList.add('warn');
      corner.querySelector('b').textContent=curve>0?'RIGHT TURN →':'← LEFT TURN';
      corner.querySelector('span').textContent=speed>rec+8?`BRAKE · ${rec} km/h`:`TARGET ${rec} km/h`;
    }else{
      corner.classList.remove('warn');
      corner.querySelector('b').textContent='STRAIGHT';
      corner.querySelector('span').textContent='FULL THROTTLE';
    }
    $('#race30Slip').classList.toggle('show',slipstream);
    $('#race30Hit').classList.toggle('show',flashHit>0);
    $('#race30Rivals').innerHTML=[{name:'YOU',p:progress,color:carId==='black'?'#18191d':'#f5f5f2'},...ais.map(a=>({name:a.name,p:a.progress,color:a.color}))]
      .sort((a,b)=>b.p-a.p).map((r,i)=>`<div class="${r.name==='YOU'?'you':''}"><i style="background:${r.color}"></i><b>${i+1}</b><span>${r.name}</span></div>`).join('');
  }

  function finishRace(){
    if(finished)return;finished=true;alive=false;
    cleanup();
    const rank=currentRank(),total=raceTime;
    state.racing.races=(state.racing.races||0)+1;
    if(rank===1)state.racing.wins=(state.racing.wins||0)+1;
    const old=state.racing.bestTimes[trackId];
    if(!old||total<old)state.racing.bestTimes[trackId]=total;
    car.stats.races=(car.stats.races||0)+1;
    car.stats.raceWins=(car.stats.raceWins||0)+(rank===1?1:0);
    const rewardBase=[0,120,75,40,20][rank]||20;
    const rewardCoins=Math.round(rewardBase*diff.reward);
    const rewardXP=Math.round((rank===1?100:rank===2?70:rank===3?45:25)*diff.reward);
    state.coins+=rewardCoins;state.xpTotal+=rewardXP;
    save();renderTaskUI?.();
    const medal=rank===1?'🥇':rank===2?'🥈':rank===3?'🥉':'🏁';
    const result=document.createElement('div');
    result.className='race30-result';
    result.innerHTML=`
      <div class="race30-result-card">
        <span class="race30-medal">${medal}</span>
        <small>FINISH</small>
        <h1>${rank===1?'1ST PLACE':rank===2?'2ND PLACE':rank===3?'3RD PLACE':'4TH PLACE'}</h1>
        <p>${track.name} · ${diff.label}</p>
        <div class="race30-result-stats">
          <div><small>TOTAL TIME</small><b>${race30FmtTime(total)}</b></div>
          <div><small>BEST LAP</small><b>${isFinite(bestLap)?race30FmtTime(bestLap):race30FmtTime(lastLap)}</b></div>
          <div><small>COLLISIONS</small><b>${collisions}</b></div>
          <div><small>OFF ROAD</small><b>${offRoadTime.toFixed(1)}s</b></div>
        </div>
        <strong class="race30-reward">+${rewardCoins} 🪙 · +${rewardXP} XP</strong>
        <div class="race30-result-actions">
          <button id="race30Again">再赛一次</button>
          <button id="race30Garage">回车库</button>
        </div>
      </div>`;
    el.appendChild(result);
    $('#race30Again').onclick=()=>{el.remove();startRace30(carId,trackId,driver,together,difficulty)};
    $('#race30Garage').onclick=()=>{el.remove();openCarGarage(carId,driver)};
  }

  function update(dt){
    if(!raceStarted||finished)return;
    raceTime+=dt;collisionCooldown=Math.max(0,collisionCooldown-dt);flashHit=Math.max(0,flashHit-dt);

    const gas=controls.gas,brake=controls.brake,hand=controls.hand;
    const left=controls.left,right=controls.right;
    const steerInput=(right?1:0)-(left?1:0);

    // Speed-sensitive continuous steering. Low speed = easier turn, high speed = smaller steering angle.
    const maxSteer=.92-(Math.min(190,speed)/190)*.42;
    steer+=(steerInput*maxSteer-steer)*Math.min(1,dt*(speed<55?5.5:3.7));
    if(!left&&!right)steer*=Math.pow(.87,dt*60);

    // Power / braking.
    const accel=gas?(43*(1-Math.min(speed,195)/245)):0;
    const braking=brake?92:0;
    const drag=4.8+speed*.016;
    speed+=accel*dt;
    speed-=braking*dt;
    speed-=drag*dt;
    if(hand){speed-=35*dt;steer*=1.16}
    speed=Math.max(0,Math.min(198,speed));

    // Track curvature physically pushes the car outward more at speed.
    const curve=race30CurveAt(track,progress+25);
    const grip=diff.grip;
    playerX+=steer*dt*(.72+speed/78)*grip;
    playerX-=curve*dt*(speed/125)*.42;
    if(Math.abs(curve)>.5&&speed>115){
      const excess=(speed-115)/80;
      playerX-=Math.sign(curve)*excess*dt*.24;
    }

    // Off road = big speed loss. This is the main "brake for corner" challenge.
    const off=Math.abs(playerX)>1.02;
    if(off){
      offRoadTime+=dt;
      speed=Math.max(32,speed-68*dt);
      playerX=Math.max(-1.34,Math.min(1.34,playerX));
    }else playerX=Math.max(-1.22,Math.min(1.22,playerX));

    // Slipstream when directly behind a rival.
    slipstream=false;
    let nearestSlip=null;
    ais.forEach(a=>{
      const gap=a.progress-progress;
      if(gap>7&&gap<34&&Math.abs(a.lane-playerX)<.20){
        nearestSlip=a;slipstream=true;
      }
    });
    if(slipstream&&gas)speed=Math.min(202,speed+8.5*dt);

    // Advance player in true distance.
    progress+=speed/3.6*dt;

    // AI racing: slows for corners and changes lane to overtake.
    ais.forEach((a,i)=>{
      const aCurve=Math.abs(race30CurveAt(track,a.progress+55));
      const cornerTarget=aCurve>.72?82:aCurve>.5?101:aCurve>.28?126:(a.base+28);
      const target=Math.min(a.base+31,cornerTarget)*diff.ai;
      a.speed+=(target-a.speed)*Math.min(1,dt*1.15);
      a.speed+=Math.sin(raceTime*.7+a.seed)*dt*1.6;
      a.speed=Math.max(65,Math.min(188,a.speed));

      // AI changes racing line sometimes.
      if(Math.random()<dt*.18){
        const opts=[-.55,0,.55];
        a.targetLane=opts[Math.floor(Math.random()*opts.length)];
      }
      a.lane+=(a.targetLane-a.lane)*Math.min(1,dt*.65);

      if(!a.finished){
        a.progress+=a.speed/3.6*dt;
        if(a.progress>=totalMeters){a.finished=true;a.finishTime=raceTime}
      }

      // Collision detection: CONTACT means immediate big speed loss.
      const gap=a.progress-progress;
      if(collisionCooldown<=0&&gap>-2.8&&gap<5.8&&Math.abs(a.lane-playerX)<.25){
        collisionCooldown=1.05;collisions++;
        speed=Math.max(20,speed*.46);
        a.speed=Math.max(60,a.speed*.76);
        playerX+=(playerX<=a.lane?-1:1)*.16;
        flashHit=.75;
        driveTone?.(85,.16,.10,'square');
      }
    });

    // Lap timing.
    const completedLaps=Math.floor(progress/track.lapMeters);
    const previousCompleted=Math.floor((progress-speed/3.6*dt)/track.lapMeters);
    if(completedLaps>previousCompleted&&completedLaps<track.laps){
      lastLap=raceTime-lapStart;
      bestLap=Math.min(bestLap,lastLap);
      lapStart=raceTime;
      if(together&&$('#race30Cheer'))$('#race30Cheer').textContent=`${carPersonName(carPartner(driver))}: Lap ${completedLaps+1}! 很快！`;
    }
    if(progress>=totalMeters){
      lastLap=raceTime-lapStart;bestLap=Math.min(bestLap,lastLap);
      finishRace();return;
    }

    cheerTimer-=dt;
    if(together&&cheerTimer<=0){
      cheerTimer=5+Math.random()*4;
      $('#race30Cheer').textContent=`${carPersonName(carPartner(driver))}: ${cheerLines[Math.floor(Math.random()*cheerLines.length)]}`;
    }
  }

  function drawCar(x,y,scale,color,label,isPlayer=false){
    ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
    if(isPlayer){
      ctx.shadowColor='rgba(0,0,0,.25)';ctx.shadowBlur=14;ctx.shadowOffsetY=8;
    }
    ctx.fillStyle=color;ctx.strokeStyle='#1c2025';ctx.lineWidth=3;
    ctx.beginPath();
    ctx.roundRect(-52,-76,104,144,24);
    ctx.fill();ctx.stroke();
    ctx.fillStyle='rgba(36,50,62,.92)';
    ctx.beginPath();ctx.roundRect(-39,-52,78,48,13);ctx.fill();
    ctx.fillStyle='#e64d57';ctx.fillRect(-43,39,23,8);ctx.fillRect(20,39,23,8);
    ctx.fillStyle='#f7f1dd';ctx.fillRect(-12,32,24,17);
    ctx.fillStyle='#272727';ctx.font='bold 11px Arial';ctx.textAlign='center';
    ctx.fillText(label,0,44);
    ctx.fillStyle='#151515';ctx.fillRect(-58,-35,8,35);ctx.fillRect(50,-35,8,35);
    ctx.fillRect(-58,23,8,35);ctx.fillRect(50,23,8,35);
    ctx.restore();
  }

  function draw(){
    const W=canvas.width,H=canvas.height,horizon=172;
    ctx.clearRect(0,0,W,H);

    // Sky / lake / mountains.
    const sky=ctx.createLinearGradient(0,0,0,horizon+120);
    sky.addColorStop(0,'#8fd0ef');sky.addColorStop(.62,'#d8eef4');sky.addColorStop(1,'#f6d8c3');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#94bfcc';ctx.fillRect(0,130,W,100);
    ctx.fillStyle='#7ea4aa';
    ctx.beginPath();ctx.moveTo(0,160);
    for(let x=0;x<=W;x+=100)ctx.lineTo(x,125+Math.sin(x*.013)*28+Math.sin(x*.031)*10);
    ctx.lineTo(W,230);ctx.lineTo(0,230);ctx.fill();

    // Pseudo-3D road slices.
    const baseCurve=race30CurveAt(track,progress+18);
    const slices=72;
    let prev=null;
    for(let i=0;i<=slices;i++){
      const p=i/slices;
      const y=horizon+p*(H-horizon);
      const persp=p*p;
      const roadHalf=78+persp*520;
      const bend=baseCurve*(1-p)*280 + Math.sin((progress*.004)+p*3.2)*baseCurve*32*(1-p);
      const center=W/2 + bend - playerX*250*persp;
      if(prev){
        ctx.fillStyle=(i+Math.floor(progress/18))%2===0?'#383b40':'#3c3f44';
        ctx.beginPath();
        ctx.moveTo(prev.center-prev.half,prev.y);ctx.lineTo(prev.center+prev.half,prev.y);
        ctx.lineTo(center+roadHalf,y);ctx.lineTo(center-roadHalf,y);ctx.closePath();ctx.fill();

        // shoulders
        ctx.strokeStyle=(i+Math.floor(progress/12))%2===0?'#f7eee0':'#d45454';
        ctx.lineWidth=Math.max(2,p*8);
        ctx.beginPath();ctx.moveTo(prev.center-prev.half,prev.y);ctx.lineTo(center-roadHalf,y);ctx.stroke();
        ctx.beginPath();ctx.moveTo(prev.center+prev.half,prev.y);ctx.lineTo(center+roadHalf,y);ctx.stroke();

        // lane markers
        if((i+Math.floor(progress/8))%8<4){
          ctx.strokeStyle='rgba(255,249,225,.92)';ctx.lineWidth=Math.max(1,p*5);
          [-1/3,1/3].forEach(f=>{
            ctx.beginPath();
            ctx.moveTo(prev.center+prev.half*f,prev.y);
            ctx.lineTo(center+roadHalf*f,y);ctx.stroke();
          });
        }
      }
      prev={center,half:roadHalf,y};
    }

    // Roadside objects actually move with distance.
    const scroll=(progress%92)/92;
    for(let side of [-1,1]){
      for(let j=0;j<9;j++){
        let p=((j/9+scroll)%1);
        p=.08+p*.92;
        const persp=p*p;
        const roadHalf=78+persp*520;
        const bend=baseCurve*(1-p)*280;
        const cx=W/2+bend-playerX*250*persp;
        const x=cx+side*(roadHalf+45+persp*95);
        const y=horizon+p*(H-horizon);
        const s=.25+p*.95;
        ctx.save();ctx.translate(x,y);ctx.scale(s,s);
        ctx.fillStyle='#5a6f39';ctx.beginPath();ctx.arc(0,-48,24,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='#7f9c51';ctx.beginPath();ctx.arc(-12,-58,19,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.arc(13,-60,17,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='#75543c';ctx.fillRect(-4,-35,8,38);
        ctx.restore();
      }
    }

    // AI cars ahead/nearby.
    ais.forEach(a=>{
      const gap=a.progress-progress;
      if(gap<-8||gap>175)return;
      const z=1-Math.max(0,gap)/180;
      const p=.18+z*.76,persp=p*p;
      const roadHalf=78+persp*520;
      const curveHere=race30CurveAt(track,progress+gap*.45)*(1-p)*240;
      const center=W/2+curveHere-playerX*250*persp;
      const x=center+a.lane*roadHalf*.72;
      const y=horizon+p*(H-horizon)-42;
      const scale=.30+z*.78;
      drawCar(x,y,scale,a.color,a.name,false);
    });

    // Player Lexus.
    const playerColor=carId==='black'?'#101318':'#f6f5f0';
    drawCar(W/2,H-112,1.18,playerColor,car.plate,true);

    // Speed lines at high speed.
    if(speed>135){
      ctx.strokeStyle='rgba(255,255,255,.34)';ctx.lineWidth=2;
      for(let i=0;i<16;i++){
        const x=(i*83+(progress*13)%83)%W;
        const y=230+(i%7)*64;
        ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+35+(speed-135)*.7);ctx.stroke();
      }
    }
  }

  function loop(ts){
    if(!alive)return;
    const dt=Math.min(.035,Math.max(.001,(ts-lastTs)/1000));lastTs=ts;
    if(!raceStarted){
      countTimer+=dt;
      const next=3-Math.floor(countTimer);
      if(next!==countValue&&next>=1){countValue=next;$('#race30Countdown').textContent=next;driveTone?.(430+next*80,.08,.04,'sine')}
      if(countTimer>=3){
        raceStarted=true;raceTime=0;lapStart=0;
        $('#race30Countdown').textContent='GO!';
        $('#race30Countdown').classList.add('go');
        driveTone?.(760,.22,.06,'sine');
        setTimeout(()=>{$('#race30Countdown')?.classList.add('hide')},650);
      }
    }else update(dt);
    draw();updateHUD();
    requestAnimationFrame(loop);
  }
  updateHUD();draw();requestAnimationFrame(loop);
}
