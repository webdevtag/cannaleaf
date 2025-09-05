window.lazyLoadOptions = [
  {
    elements_selector:
      "img[data-lazy-src],.rocket-lazyload,iframe[data-lazy-src]",
    data_src: "lazy-src",
    data_srcset: "lazy-srcset",
    data_sizes: "lazy-sizes",
    class_loading: "lazyloading",
    class_loaded: "lazyloaded",
    threshold: 300,
    callback_loaded: function (element) {
      if (
        element.tagName === "IFRAME" &&
        element.dataset.rocketLazyload == "fitvidscompatible"
      ) {
        if (element.classList.contains("lazyloaded")) {
          if (typeof window.jQuery != "undefined") {
            if (jQuery.fn.fitVids) {
              jQuery(element).parent().fitVids();
            }
          }
        }
      }
    },
  },
  {
    elements_selector: ".rocket-lazyload",
    data_src: "lazy-src",
    data_srcset: "lazy-srcset",
    data_sizes: "lazy-sizes",
    class_loading: "lazyloading",
    class_loaded: "lazyloaded",
    threshold: 300,
  },
];
window.addEventListener(
  "LazyLoad::Initialized",
  function (e) {
    var lazyLoadInstance = e.detail.instance;
    if (window.MutationObserver) {
      var observer = new MutationObserver(function (mutations) {
        var image_count = 0;
        var iframe_count = 0;
        var rocketlazy_count = 0;
        mutations.forEach(function (mutation) {
          for (var i = 0; i < mutation.addedNodes.length; i++) {
            if (
              typeof mutation.addedNodes[i].getElementsByTagName !== "function"
            ) {
              continue;
            }
            if (
              typeof mutation.addedNodes[i].getElementsByClassName !==
              "function"
            ) {
              continue;
            }
            images = mutation.addedNodes[i].getElementsByTagName("img");
            is_image = mutation.addedNodes[i].tagName == "IMG";
            iframes = mutation.addedNodes[i].getElementsByTagName("iframe");
            is_iframe = mutation.addedNodes[i].tagName == "IFRAME";
            rocket_lazy =
              mutation.addedNodes[i].getElementsByClassName("rocket-lazyload");
            image_count += images.length;
            iframe_count += iframes.length;
            rocketlazy_count += rocket_lazy.length;
            if (is_image) {
              image_count += 1;
            }
            if (is_iframe) {
              iframe_count += 1;
            }
          }
        });
        if (image_count > 0 || iframe_count > 0 || rocketlazy_count > 0) {
          lazyLoadInstance.update();
        }
      });
      var b = document.getElementsByTagName("body")[0];
      var config = { childList: !0, subtree: !0 };
      observer.observe(b, config);
    }
  },
  !1
);

(() => {
  class RocketElementorPreload {
    constructor() {
      (this.deviceMode = document.createElement("span")),
        (this.deviceMode.id = "elementor-device-mode-wpr"),
        this.deviceMode.setAttribute("class", "elementor-screen-only"),
        document.body.appendChild(this.deviceMode);
    }
    t() {
      let t = getComputedStyle(this.deviceMode, ":after").content.replace(
        /"/g,
        ""
      );
      (this.animationSettingKeys = this.i(t)),
        document
          .querySelectorAll(".elementor-invisible[data-settings]")
          .forEach((t) => {
            const e = t.getBoundingClientRect();
            if (e.bottom >= 0 && e.top <= window.innerHeight)
              try {
                this.o(t);
              } catch (t) {}
          });
    }
    o(t) {
      const e = JSON.parse(t.dataset.settings),
        i = e.m || e.animation_delay || 0,
        n = e[this.animationSettingKeys.find((t) => e[t])];
      if ("none" === n) return void t.classList.remove("elementor-invisible");
      t.classList.remove(n),
        this.currentAnimation && t.classList.remove(this.currentAnimation),
        (this.currentAnimation = n);
      let o = setTimeout(() => {
        t.classList.remove("elementor-invisible"),
          t.classList.add("animated", n),
          this.l(t, e);
      }, i);
      window.addEventListener("rocket-startLoading", function () {
        clearTimeout(o);
      });
    }
    i(t = "mobile") {
      const e = [""];
      switch (t) {
        case "mobile":
          e.unshift("_mobile");
        case "tablet":
          e.unshift("_tablet");
        case "desktop":
          e.unshift("_desktop");
      }
      const i = [];
      return (
        ["animation", "_animation"].forEach((t) => {
          e.forEach((e) => {
            i.push(t + e);
          });
        }),
        i
      );
    }
    l(t, e) {
      this.i().forEach((t) => delete e[t]),
        (t.dataset.settings = JSON.stringify(e));
    }
    static run() {
      const t = new RocketElementorPreload();
      requestAnimationFrame(t.t.bind(t));
    }
  }
  document.addEventListener("DOMContentLoaded", RocketElementorPreload.run);
})();

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'97298d9f8d8346c5',t:'MTc1NTc3MzI1Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='cdn-cgi/challenge-platform/h/b/scripts/jsd/4710d66e8fda/maind41d.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
