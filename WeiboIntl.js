let url = $request.url;
let body = null;
// 探索页
if (url.includes("a=discover_all")) {
  let e = JSON.parse($response.body);

  if (Array.isArray(e.data)) {
    e.data = e.data.filter(item => item.type !== "native_topic" && item.type !== "native_tl");
    body = JSON.stringify(e);
  }
}
// 趋势页
else if (url.includes("a=trends")) {
  let e = JSON.parse($response.body);

  if (e.data.order) {
    e.data.order = ["search_topic"];
    body = JSON.stringify(e);
  }
}
// 微博热搜
else if (url.includes("a=search_discover")) {
  let e = JSON.parse($response.body);

  if (Array.isArray(e.data)) {
    e.data = e.data.filter(item => item.type !== "search_ent" && item.type !== "search_city");
    body = JSON.stringify(e);
  }
}
// 开屏广告
else if (url.includes("a=get_coopen_ads")) {
  let e = JSON.parse($response.body);

  if (e.data) {
    e.data.ad_list = [];
    e.data.gdt_video_ad_ios = [];
    e.data.display_ad = 0;
    e.data.ad_ios_id = null;
    e.data.app_ad_ios_id = null;
    e.data.reserve_ad_ios_id = "";
    e.data.reserve_app_ad_ios_id = "";
    e.data.ad_duration = 604800;
    e.data.ad_cd_interval = 604800;
    e.data.pic_ad = [];
    body = JSON.stringify(e);
  }
}
// 帖子中的会员Banner
else if (url.includes("a=open_app&auth")) {
  let e = JSON.parse($response.body);

  if (e.data) {
    e.data.uve_ad_scene = "";
    e.data.vip_info = {};
    e.data.vip_title_ad = "";
    e.data.close_ad_setting = {};
    e.data.background_preview = "";
    e.data.detail_banner_ad = [];
    body = JSON.stringify(e);
  }
}
// 我的页面
else if (url.includes("a=user_center")) {
  let e = JSON.parse($response.body);

  if (e.data.cards) {
    const typesToRemove = [
      "personal_vip",
      "ic_profile_wallpaper",
      "personal_liked",
      "personal_wallpaper",
      "personal_feedback",
      "personal_darft"
    ];

    e.data.cards = e.data.cards.filter(card => {
      card.items = card.items.filter(item => !typesToRemove.includes(item.type));
      return card.items.length > 0;
    });

    body = JSON.stringify(e);
  }
}
// 大家都在搜
else if (url.includes("a=get_searching_info")) {
  let e = JSON.parse($response.body);

  if (e.data) {
    e.data.cards = [];
    e.data.expiration_time = "604800";
    body = JSON.stringify(e);
  }
}
// 热门搜索
else if (url.includes("ct=feed&a=search_topic")) {
  let e = JSON.parse($response.body);

  if (e.data) {
    e.data = [];
    body = JSON.stringify(e);
  }
}

$done({ body: body || $response.body });