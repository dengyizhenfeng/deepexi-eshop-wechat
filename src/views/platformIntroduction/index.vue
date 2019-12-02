<template>
  <div style="font-size: 100px !important;">
    <div class="model" style="display: none;">
      <div class="model-title"/>
      <div class="model-body"/>
      <img class="btn-close" src="@/assets/image/introduction/btn-close.png" @click="closeModel">
    </div>
    <!-- music -->
    <i class="icon-music-outer">
      <i class="forbid icon-music" @click="musicPause"/>
      <i class="forbid icon-forbidMusic" style="display: none;" @click="musicPlay"/> 
      <audio id="bgMusic" loop controls autoplay="autoplay" @click="audioclick">
        <source src="@/assets/bg.mp3" type="audio/mpeg">
      </audio>
    </i>
    <div class="swiper-container">
      <swiper ref="swiper" :options="swiperOption" class="swiper-wrapper">
        <swiper-slide class="swiper-slide pageFirst">
          <img
            class="logo-slogan ani animated fadeInDown duration7 delay3"
            src="@/assets/image/introduction/logo-slogan.png"
          >
          <div class="content">
            <p class="ani animated fadeInUp duration7 delay7">
              为解决电动汽车销售行业痛点及消费者购车痛点，
              国网电动汽车公司全力打造电动汽车“新零售”服务体系，
              将销售与服务有机结
            </p>
            <button
              type="button"
              data-id="0"
              data-name="pager1Arr"
              class="open-model ani animated bounceIn duration5 delay1"
              @click="openModal($event)"
            >
              了解e车购
            </button>
            <img
              src="@/assets/image/introduction/flower.png"
              class="ani animated fadeInUp duration7 delay3"
            >
          </div>
          <img src="@/assets/image/introduction/arrow.png" class="arrow" alt>
        </swiper-slide>
        <swiper-slide class="swiper-slide pageSecond">
          <img class="page2-logo1" src="@/assets/image/introduction/page2-logo1.png">
          <div class="content">
            <div class="pg2-title">
              <div class="title-box">
                <h3 class="ani animated fadeInDown duration7 delay3">电动汽车</h3>
                <div class="ani animated bounceInRight duration7 delay7">
                  <span>Superiority contrast</span>
                  <p>使用优势对比</p>
                </div>
              </div>
              <p class="label ani animated fadeInUp duration7 delay7">为啥要使用电动汽车？为您算上一笔账！</p>
            </div>
            <div class="pk-cont">
              <div class="pk-box">
                <img
                  class="pk-img ani animated fadeInUp duration7 delay7"
                  src="@/assets/image/introduction/pk-img.png"
                >
              </div>
            </div>
            <div class="contrast">
              <div class="contrast-item ani animated bounceInLeft duration7 delay9">
                <p class="title">电动汽车</p>
                <p class="text">
                  <span>车船费</span>及
                  <span>购置税</span>
                  可享受国家/地方补贴
                </p>
              </div>
              <div class="contrast-item ani animated bounceInRight duration7 delay9">
                <p class="title">普通燃油车</p>
                <p class="text">
                  需
                  <span>车船费</span>及
                  <span>购置税</span>
                  不可享受补贴
                </p>
              </div>
            </div>
            <div class="contrast">
              <div class="contrast-item ani animated bounceInLeft duration7 delay9">
                <p class="text">
                  以行驶
                  <span>10万公里</span>计算
                  保养费大约
                  <span>4000元</span>
                  使用成本大约
                  <span>9000元</span>
                </p>
              </div>
              <div class="contrast-item ani animated bounceInRight duration7 delay9">
                <p class="text">
                  以行驶
                  <span>10万公里</span>计算
                  普通燃油车相同里程则大约需要
                  <span>6.7万元</span>
                </p>
              </div>
            </div>
            <div class="contrast">
              <div class="contrast-item ani animated bounceInLeft duration7 delay9">
                <img
                  class="stamp ani animated zoomInUp duration7 delay15"
                  src="@/assets/image/introduction/stamp.png"
                >
                <p class="text">
                  不受
                  <span>限号政策</span>影响
                </p>
              </div>
              <div class="contrast-item ani animated bounceInRight duration7 delay9">
                <p class="text">
                  受
                  <span>限号政策</span>影响
                </p>
              </div>
            </div>
          </div>
          <img
            class="page2-logo2 ani animated fadeInRight duration7 delay15"
            src="@/assets/image/introduction/page2-logo2.png"
          >
          <img src="@/assets/image/introduction/arrow.png" class="arrow" alt>
        </swiper-slide>
        <swiper-slide class="swiper-slide pageThird">
          <div class="content">
            <img
              class="logo-page3 ani animated fadeInDown duration7 delay3"
              src="@/assets/image/introduction/logo-page3.png"
            >
            <img
              class="lightspot-1 open-model ani animated fadeInLeft duration7 delay3"
              data-id="0"
              data-name="page3Arr"
              src="@/assets/image/introduction/lightspot-1.png"
              @click="openModal($event)"
            >
            <img
              class="lightspot-2 open-model ani animated fadeInRight duration7 delay53"
              data-id="1"
              data-name="page3Arr"
              src="@/assets/image/introduction/lightspot-2.png"
              @click="openModal($event)"
            >
            <img
              class="lightspot-3 open-model ani animated fadeInLeft duration7 delay73"
              data-id="2"
              data-name="page3Arr"
              src="@/assets/image/introduction/lightspot-3.png"
              @click="openModal($event)"
            >
            <img
              class="lightspot-4 open-model ani animated fadeInRight duration7 delay93"
              data-id="3"
              data-name="page3Arr"
              src="@/assets/image/introduction/lightspot-4.png"
              @click="openModal($event)"
            >
          </div>
          <img src="@/assets/image/introduction/arrow.png" class="arrow" alt>
        </swiper-slide>
        <swiper-slide class="swiper-slide pageFourth">
          <div class="content">
            <img
              class="logo-page4 ani animated fadeInDown duration7 delay3"
              src="@/assets/image/introduction/logo-page4.png"
            >
            <p class="title ani animated fadeIn duration2 delay3">
              依托强大的平台支撑及独创的四步购车法，
              将购车全流程线上贯通，实现超便捷购车，
              为用户节约购车成本。
            </p>
            <div class="buyCar-step">
              <div
                class="step-item step1 open-model ani animated fadeInLeft duration1 delay3"
                data-name="page4Arr"
                data-id="0"
                @click="openModal($event)"
              >
                <div>
                  <span data-name="page4Arr" data-id="0" @click="openModal($event)">选车</span>
                  <p data-name="page4Arr" data-id="0" @click="openModal($event)">打造用户需求定制推荐新模式</p>
                </div>
              </div>
              <div
                class="step-item step2 open-model ani animated fadeInRight duration1 delay7"
                data-name="page4Arr"
                data-id="1"
                @click="openModal($event)"
              >
                <div>
                  <span data-name="page4Arr" data-id="1" @click="openModal($event)">订车</span>
                  <p data-name="page4Arr" data-id="1" @click="openModal($event)">打造套餐式下单新体验</p>
                </div>
              </div>
            </div>
            <div class="buyCar-step buyCar-step2">
              <div
                class="step-item step3 open-model ani animated fadeInLeft duration1 delay1"
                data-name="page4Arr"
                data-id="2"
                @click="openModal($event)"
              >
                <div>
                  <span data-name="page4Arr" data-id="2" @click="openModal($event)">验车</span>
                  <p data-name="page4Arr" data-id="2" @click="openModal($event)">打造视频远程验车新方式</p>
                </div>
              </div>
              <div
                class="step-item step4 open-model ani animated fadeInRight duration1 delay13"
                data-name="page4Arr"
                data-id="3"
                @click="openModal($event)"
              >
                <div>
                  <span data-name="page4Arr" data-id="3" @click="openModal($event)">交车</span>
                  <p data-name="page4Arr" data-id="3" @click="openModal($event)">打造个性化交车新选择</p>
                </div>
              </div>
            </div>
            <p class="tips ani animated fadeInUp duration2 delay3">点击板块可查看详情</p>
          </div>
          <img src="@/assets/image/introduction/arrow.png" class="arrow" alt>
        </swiper-slide>
        <swiper-slide class="swiper-slide pageFifth">
          <div class="content">
            <img
              class="logo-page ani animated fadeInDown duration1 delay3"
              src="@/assets/image/introduction/logo-page5.png"
              @click="musicPause"
            >
            <img
              class="page5-code ani animated rotateIn duration1 delay3"
              src="@/assets/image/introduction/page5-code.gif"
            >
            <button type="button" class="ani animated bounceIn duration1 delay1">长按扫二维码进入e车购</button>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import "../../assets/flexible.js";
import { setTimeout } from "timers";
var audio = document.getElementById("bgMusic");
var iconMusic = document.getElementsByClassName("icon-music")[0];
var iconForbidMusic = document.getElementsByClassName("icon-forbidMusic")[0];
export default {
  data() {
    return {
      index: 0,
      datas: {
        pager1Arr: [
          {
            title: "产品及公司介绍",
            text:
              "<p>为解决电动汽车销售行业痛点及消费者购车痛点，国网电动汽车公司全力打造电动汽车" +
              "<span>“新零售”</span>服务体系，将销售与服务有机结合。</p>" +
              "<p>电动汽车“新零售”服务体系基于智慧车联网平台，结合大数据、标签识别技术与营业厅线" +
              "下网络优势，构建“e车购”电动汽车“新零售”平台，打造 “<span>宣传推广、展示体验、选车比价、装桩接电、销售上牌、金融保险、充电缴费、车后市场、能源服务" +
              "</span>” 的全流程、一条龙电动汽车新零售服务产品；以线下体验、线上消费为服务核心，为客户提供更便捷、" +
              "更轻松、更智能的“<span>物联网+</span>”一站式电动汽车全生命周期服务体验。</p>"
          }
        ],
        page4Arr: [
          {
            title: "选车环节",
            text:
              "<p>平台可根据用户个性化需求，智能推荐专属意向车型，帮助用户进行车型对比，360全景看车及试驾预约</p>"
          },
          {
            title: "订车环节",
            text:
              "<p>平台提供灵活的套餐式服务推荐，用户可按需选择，减少强制捆绑消费，在线上勾选即完成下单，系统将自动生成购车合同，与用户建立契约关系</p>"
          },
          {
            title: "验车环节",
            text:
              "<p>用户可选择线上视频验车，减少用户时间成本，确认后，为用户公示车架号，锁定专属座驾，还可通过线上银联支付尾款，完成购车交易</p>"
          },
          {
            title: "交车环节",
            text:
              "<p>用户可自由选择交车时间及地点，包含营业厅交车，指定门店交车或送车上门，最终完成车辆交接手续</p>"
          }
        ],
        page3Arr: [
          {
            title: "服务一条龙，套餐总价低",
            text:
              "<p><span>车辆方面</span>" +
              "通过与多家新能源主机厂商战略合作，可为用户提供多品牌热销车型或专属定制车型选择。</p>" +
              "<p><span>充电方面，</span>" +
              "，结合主业优势，可为用户提供充电桩报装、安装、全国充电网络优惠套餐等全面充电服务，解决用户报装难、充电难的痛点。</p>" +
              "<p><span>金融产品方面</span>" +
              "，为用户提供信用分期、网捷贷等灵活的金融套餐，降低用户购车一次性投入。</p>" +
              "<p><span>保险方面</span>" +
              "，针对用车人群进行风险评估，推出全险黄金套餐、最佳保障套餐、经济实用套餐" +
              "等多种定制保险套餐服务，最大化返利给用户，降低用户购车总价。后续还可为用户" +
              "提供验车上牌、装饰美容、维修保养等车后市场服务，结合新能源业务板块优势，还可将用户优先选入参与有序充电、能源交易。</p>"
          },
          {
            title: "电管家引导，家门口充电",
            text:
              "<p>依托全国2万多家深入乡镇的实体营业厅网络，可以提供专属顾问的引导式体验服务，帮助用户讲解电动汽车使用" +
              "常识，为用户推荐符合需求的套餐服务，在用户购买电动汽车之后营业厅网点还可作为城乡便利充电补给站，真正实现便捷快速加电。</p>"
          },
          {
            title: "线上全贯通，购车轻量化",
            text:
              "<p>依托强大的平台支撑及独创的四步购车法，将购车全流程线上贯通，实现超便捷购车，为用户节约购车成本。</p>" +
              "<p><span>选车环节，打造用户需求定制推荐新模式</span></p>" +
              "<p>平台可根据用户个性化需求，智能推荐专属意向车型，帮助用户进行车型对比，360全景看车及试驾预约。</p>" +
              "<p><span>订车环节，打造套餐式下单新体验</span></p>" +
              "<p>平台提供灵活的套餐式服务推荐，用户可按需选择，减少强制捆绑消费，在线上勾选即完成下单，系统将自动生成购车合同，与用户建立契约关系</p>" +
              "<p><span>验车环节，打造视频远程验车新方式</span></p>" +
              "<p>用户可选择线上视频验车，减少用户时间成本，确认后，为用户公示车架号，锁定专属座驾，还可通过线上银联支付尾款，完成购车交易</p>" +
              "<p><span>交车环节，打造个性化交车新选择</span></p>" +
              "<p>用户可自由选择交车时间及地点，包含营业厅交车，指定门店交车或送车上门，最终完成车辆交接手续</p>"
          },
          {
            title: "全流程跟踪，全天候服务",
            text:
              "<p>用户通过平台进行会员注册之后，系统会进行专属顾问分配，提供一对一专属服务，当用户下单后，平台可进行全," +
              "流程服务跟踪，让用户清晰了解订单状态，并可随时拨打95598客服电话，进行业务咨询或发起服务需求，我们提供7X24小时的全时段服务，用户可随时随地找到我们。</p>"
          }
        ]
      },
      swiperOption: {
        direction: "vertical",
        // slidesPerView: 1,
        // spaceBetween: 30,
        mousewheel: true,
        on: {
          slideChangeTransitionStart: function() {
            var list = $(".animated");
            for (let i = 0; i < list.length; i++) {
              let classArr = Array.from(list[i].classList);
              list[i].className = "";
              let classNames = classArr.join(" ");
              // this.$nextTick(function () {
              //   list[i].className = classNames
              // })
              setTimeout(function() {
                list[i].className = classNames;
              }, 10);
            }
          }
        }
      }
    };
  },
  mounted() {
    $(".btn-close").on("click", function() {
      $(".model").fadeOut();
    });
    // music
/*     function audioAutoPlay(audio) {
      document.addEventListener(
        "WeixinJSBridgeReady",
        function() {
          audio.play();
        },
        false
      );
      document.addEventListener(
        "YixinJSBridgeReady",
        function() {
          audio.play();
        },
        false
      );
    }
    audioAutoPlay(audio); */
    this.audioclick()
    // console.log('this is current swiper instance object', this.swiper)
  },
  methods: {
    closeModel() {
      $(".model").fadeOut();
    },
    openModal(e) {
      var id = $(e.target).attr("data-id");
      var name = $(e.target).attr("data-name");
      $(".model")
        .find(".model-title")
        .text(this.datas[name][id].title);
      $(".model")
        .find(".model-body")
        .html(this.datas[name][id].text);
      $(".model").fadeIn();
    },

    musicPause() {
      this.getElemnt();
      var audio = document.getElementById("bgMusic");
      var iconMusic = document.getElementsByClassName("icon-music")[0];
      var iconForbidMusic = document.getElementsByClassName(
        "icon-forbidMusic"
      )[0];
      audio.pause();
      iconMusic.style.display = "none";
      iconForbidMusic.style.display = "block";
    },
    musicPlay() {
      this.getElemnt();
      var audio = document.getElementById("bgMusic");
      var iconMusic = document.getElementsByClassName("icon-music")[0];
      var iconForbidMusic = document.getElementsByClassName(
        "icon-forbidMusic"
      )[0];
      audio.play();
      iconMusic.style.display = "block";
      iconForbidMusic.style.display = "none";
    },
    getElemnt() {
      var audio = document.getElementById("bgMusic");
      var iconMusic = document.getElementsByClassName("icon-music")[0];
      var iconForbidMusic = document.getElementsByClassName(
        "icon-forbidMusic"
      )[0];
    },
    audioclick() {
    var voice = document.getElementById('bgMusic');
        // 调用 <audio> 元素提供的方法 play()
        voice.play();
        // 判斷 WeixinJSBridge 是否存在
        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            voice.play();
        } else {
            // 監聽客户端抛出事件"WeixinJSBridgeReady"
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", function() {
                    voice.play();
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", function() {
                    voice.play();
                });
                document.attachEvent("onWeixinJSBridgeReady", function() {
                    voice.play();
                });
            }
        }
        
        // voiceStatu用來記録狀態,使 touchstart 事件只能觸發一次有效,避免與 click 事件衝突
        var voiceStatu = true;
        // 监听 touchstart 事件进而调用 <audio> 元素提供的 play() 方法播放音频
        document.addEventListener("touchstart", function(e) {
            if (voiceStatu) {
                voice.play();
                voiceStatu = false;
            }
        }, false);
    }
  },
  beforeDestroy() {
    this.getElemnt();
      var audio = document.getElementById("bgMusic");
      var iconMusic = document.getElementsByClassName("icon-music")[0];
      var iconForbidMusic = document.getElementsByClassName(
        "icon-forbidMusic"
      )[0];
      audio.pause();
      iconMusic.style.display = "none";
      iconForbidMusic.style.display = "block";
  }
};
</script>
<style scoped>
@import "./../../assets/css/style.css";
.duration1 {
  animation-duration: 1s;
}
.duration2 {
  animation-duration: 2s;
}
.duration5 {
  animation-duration: 0.5s;
}
.duration7 {
  animation-duration: 0.7s;
}
.delay1 {
  animation-delay: 1s;
}
.delay3 {
  animation-delay: 0.3s;
}
.delay7 {
  animation-delay: 0.7s;
}
.delay9 {
  animation-delay: 0.9s;
}
.delay13 {
  animation-delay: 1.3s;
}
.delay15 {
  animation-delay: 1.5s;
}
.delay53 {
  animation-delay: 0.53s;
}
.delay73 {
  animation-delay: 0.73s;
}
.delay93 {
  animation-delay: 0.93s;
}
.van-swipe__indicators--vertical {
  display: none;
}
#test{
  background-color: black
}
</style>
