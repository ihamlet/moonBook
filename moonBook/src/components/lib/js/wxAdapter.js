(function() {
  window.setMeta = function(name, val) {
    var meta = document.querySelectorAll(
      'meta[property="' + name + '"], meta[name="' + name + '"]'
    )
    if (!meta.length) {
      meta = document.createElement("meta")
      meta.name = name
      document.head.appendChild(meta)
      meta = [meta]
    }
    meta[0].content = val || ""
  }
  window.getMeta = function(name) {
    var meta = document.querySelectorAll(
      'meta[property="' + name + '"], meta[name="' + name + '"]'
    );
    if (!meta.length) {
      return ""
    } else {
      return meta[0].content
    }
  }
  !getMeta("weixin:chat_title") &&
    setMeta("weixin:chat_title", document.title)
  !getMeta("weixin:timeline_title") &&
    setMeta("weixin:timeline_title", document.title)
  !getMeta("weixin:description") &&
    setMeta("weixin:description", getMeta("og:description"))
})();

//禁止微信修改字体
(function() {
  if (
    typeof WeixinJSBridge == "object" &&
    typeof WeixinJSBridge.invoke == "function"
  ) {
    handleFontSize()
  } else {
    if (document.addEventListener) {
      document.addEventListener(
        "WeixinJSBridgeReady",
        handleFontSize,
        false
      )
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", handleFontSize)
      document.attachEvent("onWeixinJSBridgeReady", handleFontSize)
    }
  }
  function handleFontSize() {
    WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 })
    WeixinJSBridge.on("menu:setfont", function() {
      WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 })
    })
  }
})()

