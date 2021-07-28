<template>
  <div class="box">
    <div
      @click="add"
      @mouseenter="enter" @mouseleave="leave" 
      class="prolist animated"
      ref="prolist"
      style="width:120px;height:75px"
      v-show="!drawer"
    >
      <!-- 产品列表第一版 -->
      <!-- <div class="left">
        <div @click="closePage" @mouseleave="mouseLeave" class="right" ref="right">
          <span class="animated bounceIn">产品列表</span>
        </div>
      </div>-->

      <!-- 产品列表第二版 -->
      <div class="product-list">
        <div class="product-icon">
          <van-icon name="bars" />
          <span>产品列表</span>
        </div>
        <div class="product-img" v-show="imgShow" > 
          <img v-if="productList.length>0"  :src="productList[0].bigFilePath" alt="">
        </div>

      </div>

    </div>
    <!-- 产品列表第一版 -->
    <!-- <div @mouseenter="arrow()" class="arrow" ref="arrow">
      <span style="width:50px;display: block;">
        <van-icon class="move ar-animated ar-delay-2s" name="arrow" />
        <van-icon class="move ar-animated ar-delay-1s" name="arrow" />
        <van-icon class="move ar-animated" name="arrow" />
      </span>
    </div>-->

    <!-- 产品列表第二版 -->

    <el-drawer
      :modal="false"
      :size="size"
      :visible.sync="drawer"
      :with-header="false"
      @open="open"
      direction="btt"
      title="我是标题"
    >
      <div class="kong"></div>
      <!-- 商品数据列表2.0 -->

      <div
        @click="hiddenLogin"
        @mousewheel="scrool"
        class="list animated fadeIn"
        ref="fatList"
        v-if="tableShow"
      >
        <div class="list-table" ref="lists">
          <div :key="index" class="list-tr" v-for="(item, index) in productList">
            <div @click="big(item.bigFilePath)" class="imgs">
              <div class="grid" ref="gallery" v-loading="loading">
                <img :src="`${item.bigFilePath}`" alt />
              </div>
              <img :src="`${item.bigFilePath}`" alt style="display:none" />
            </div>
            <div :title="item.productName" class="title">{{ item.productName }}</div>
            <div class="price" v-show="priceShow">
              ￥{{
              (orderList[index].price = endPrice(item.productPrices, index))
              }}元/{{ item.productUnits }}
            </div>
            <div class="input" v-show="priceShow">
              <input
                @blur="inputBtn(item.productPrices, index,item.moq)"
                class="el-input"
                oninput="if(value.length>5)value=value.slice(0,6)"
                onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                placeholder="请输入数量"
                v-model.number.trim="orderList[index].orderNumber"
              />
            </div>
            <div
              :title="item.productDesc"
              class="describe"
              v-show="priceShow"
            >{{ item.productDesc }}</div>
          </div>
        </div>
      </div>

      <div @mousewheel="scrools" class="list-li animated fadeIn" ref="listT" v-if="!tableShow">
        <div class="table-box">
          <div class="scoll-box">
            <div
              :key="index"
              @click.stop="bigImage(index)"
              class="tr_container"
              v-for="(item, index) in productList"
            >
              <div class="logins">
                <div class="smallImg">
                  <div @click.stop ref="image" v-loading="loading">
                    <img :src="`${item.bigFilePath}`" alt />
                  </div>
                </div>
              </div>
              <div :title="item.productName" class="names">{{ item.productName }}</div>
              <div class="prices" v-show="priceShow">
                {{
                (orderList[index].price = endPrice(
                item.productPrices,
                index
                ))
                }}/{{ item.productUnits }}
              </div>
              <div
                :title="item.productDesc"
                class="describes"
                v-show="priceShow"
              >{{ item.productDesc }}</div>
              <div @click.stop class="numbers" v-show="priceShow">
                <input
                  @blur="inputBtn(item.productPrices, index,item.moq)"
                  class="el-input"
                  oninput="if(value.length>5)value=value.slice(0,6)"
                  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                  placeholder="请输入数量"
                  v-model.number.trim="orderList[index].orderNumber"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="trBtn">
        <div class="tright list-top">
          <i @click="changeList" class="el-icon-s-unfold libiao" v-if="ifTable"></i>
          <i @click="changeTable" class="el-icon-menu biaoge" v-else></i>
        </div>
        <div @click.stop="closeDrawer" class="tright">
          <span class="iconfont icon-shouqi2"></span>
        </div>
        <div>
          <input @click.stop="onSubmit" class="subBtn" type="button" value="确认订单" />
        </div>
      </div>
      <div class="mengceng" v-if="bigImg.show">
        <div
          :class="bigImg"
          @click.stop="size = '100%'"
          class="bigImgs animated animate__fadeIn"
          ref="bigImg"
        >
          <div class="rotate-box animated zoomIn" ref="image">
            <div @click="rotate" class="rotate animated fadeIn" ref="rotate">
              <i class="el-icon-refresh-right"></i>
            </div>
            <img :src="img" alt class="followm" />
            <i @click.stop="closeBigImg" class="el-icon-error animated zoomIn" ref="is"></i>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
const token = window.sessionStorage.getItem("user-token");
const listInfo = window.sessionStorage.getItem("listInfo");
// import Viewer from "v-viewer";
import Viewer from "viewerjs";
import bus from "../../utils/bus";

// console.log("88888", listInfo);
export default {
  data () {
    return {
      imgShow:true,
      drawer: false,
      productList: [],
      orderList: [],
      img: "",
      bigImg: { hide: true, show: false },
      bigShows: false,
      size: "100%",
      token: token,
      arr: [],
      totalprice: 0,
      listInfo: listInfo,
      bigShows: false,
      ifTable: true,
      tableShow: true,
      deg: 0,
      viewer: null,
      imgList: [],
      views: [],
      loading: true,
      priceShow: false,
      paddingNum: "",
      two: "",
      numCheck: 1,
      muilt: 1,
      muilts: 1,
      options: {
        inline: true,
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: true,
        keyboard: true,
        url: "data-source"
      }
    };
  },
  computed: {},
  created () {
    this.getList();

    // this.setImg();

    this.imgShow = true;
  },
  mounted () {
    var token_imit = window.sessionStorage.getItem("user-token");
    if (token_imit) {
      this.priceShow = true;
    } else {
      // debugger
      this.priceShow = false;
    }

    // this.openListBtn()

    this.productListHidden();
    // window.addEventListener("mousewheel", this.handleScroll, false);
  },
  updated () { },
  methods: {


    // 产品列表第二版
    productListHidden(){
      setTimeout(() => {
        this.$refs.prolist.classList.add('leave')
        this.imgShow = false;
      },7000)

    },
    enter(){
      this.$refs.prolist.classList.remove('leave')
    },
    leave(){
      this.imgShow = false;
      this.$refs.prolist.classList.add('leave')
    },








    openListBtn () {
      console.log('right', this.$refs.prolist);

      setTimeout(() => {
        this.$refs.prolist.classList.add('prolistBlock');
        this.$refs.prolist.classList.add('heartBeat');
      }, 2000)

      setTimeout(() => {
        this.$refs.prolist.classList.remove('heartBeat');
        this.$refs.prolist.classList.add('bounceOutRight');
        // this.$refs.prolist.classList.remove('rightBlock');
      }, 3000)

      setTimeout(() => {
        this.$refs.prolist.classList.remove('prolistBlock');
        this.$refs.arrow.classList.add('arrowBlock');
      }, 4000)


    },
    arrow () {
      this.$refs.arrow.classList.remove('arrowBlock');
      this.$refs.prolist.classList.remove('bounceOutRight');
      this.$refs.prolist.classList.add('bounceInRight');

      this.$refs.prolist.classList.add('prolistBlock');
    },
    mouseLeave () {
      console.log('画出来了');
      this.$refs.arrow.classList.add('arrowBlock');
      this.$refs.prolist.classList.add('bounceOutRight');

    },

    open () {
      // debugger
      this.tableView();
    },

    bigImage (index) {
      this.views[index].view();
    },
    setImg () {
      Viewer.setDefaults({
        Options: {
          inline: false,
          button: true,
          navbar: true,
          title: true,
          toolbar: true,
          tooltip: true,
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: true,
          transition: true,
          fullscreen: true,
          keyboard: true,
          url: "data-source"
        }

        // ready: function(e) {
        //   console.log(e.type, "组件以初始化");
        // },
        // show: function(e) {
        //   console.log(e.type, "图片显示开始");
        // },
        //   url: function(img){
        //     // console.log('我家是11111',this.Viewer)
        //     //  this.Viewer.update();
        //     // return img.src.replace('?w=110', '')
        // },
        // shown: function(e) {
        //   console.log(e.type, "图片显示结束");
        // },
        // hide: function(e) {
        //   console.log(e.type, "图片隐藏完成");
        // },
        // hidden: function(e) {
        //   console.log(e.type, "图片隐藏结束");
        // },
        // view: function(e) {
        //   console.log(e.type, "视图开始");
        // }
      });
    },

    inputBtn (item, index, moq) {
      // debugger
      var inputNum = item[0].productNumber; //请订值
      var moq = moq; //购买数量的基准值
      var num = this.orderList[index].orderNumber; //用户输入的值
      console.log("pppp", num);

      // 起订不能低于指定值
      if (moq != 0 && num !== '' && num !== null) {
        this.$message({
          message: `起订数量为${moq}`,
          type: "warning"
        });
        this.orderList[index].orderNumber = "";
      }

      if (item.length > 1 && num >= inputNum) {
        // debugger;
        for (var i = 0; i < item.length; i++) {
          // if (i + 1 == item.length) {
          //   var b = item[i].price;
          //   console.log("我就是价格", b);
          // }

          if (i < item.length) {
            //判断最后一个值，不进行中间值的对比，直接获取大于最后一个数值后为多少单价。（包含临界点）
            if (i + 1 == item.length) {
              if (num >= item[i].productNumber) {
                console.log("大于长度le", item[i].productNumber);
                console.log("大于长度le", item[i].price);
                console.log("价格为", item[i].price);
                this.orderList[index].price = item[i].price;
              }

              // console.log("我就是价格", a);
            }
            //中间值的对比，看在哪一个区间 获取相对于的单价。（包含临界点）
            if (i + 1 < item.length && i + 1 !== item.length) {
              // console.log("第一个值", item[i].productNumber);
              // console.log("第二个值", item[i + 1].productNumber);

              if (
                num >= item[i].productNumber &&
                num < item[i + 1].productNumber
              ) {
                console.log("比较的值", num);
                console.log("第一个值", item[i].productNumber);
                console.log("第二个值", item[i + 1].productNumber);
                console.log("价格为", item[i].price);
                break;
              }
            }

            // if (i + 1 < item.length && i + 1 !== item.length) {
            //   if (
            //     Number(item[i].productNumber) < Number(num) &&
            //     Number(num) < Number(item[i + 1].productNumber)
            //   ) {
            //     console.log("对比的值", num);

            //     console.log("第一个值", item[i].productNumber);
            //     console.log("第二个值", item[i + 1].productNumber);
            //   }
            // }

            // i--;
          }
          // debugger
        }

        console.log("?>>>>>>>", item.length);
        console.log("?>>>>>>>", item);
      }
    },

    // 列表图片放大
    hiddenLogin () {
      this.$store.state.loginShow = false;
    },
    big (imgurl, e) {
      // console.log('tttt',e)
      // this.bigShows = true;
      // this.img = imgurl;
      // console.log("this", this.img);
      // this.setImg();
      // this.bigShows = true;
      // this.bigImg.show = true;
      // this.bigImg.hide = false;
    },
    // 切换列表和表格
    changeList () {
      this.ifTable = false;
      this.tableShow = false;
      // this.numCheck = 1
      this.muilts = 1;

      this.$nextTick(() => {
        this.$refs.listT.style.paddingTop = "60px";
      });

      this.listView();
    },

    // 初始化列表放大实例
    listView () {
      this.$nextTick(() => {
        for (var i = 0; i < this.$refs.image.length; i++) {
          this.views.push(new Viewer(this.$refs.image[i], { title: false }));
        }
      });
    },
    // 初始化表格放大实例
    tableView () {
      this.$nextTick(() => {
        for (var i = 0; i < this.$refs.gallery.length; i++) {
          this.viewer = new Viewer(this.$refs.gallery[i], { title: false });


        }
      });
    },
    changeTable () {
      this.ifTable = true;
      this.tableShow = true;
      console.log("2");
      this.muilt = 1;
      this.$nextTick(() => {
        this.$refs.fatList.style.paddingTop = "60px";
      });
      this.tableView();
    },
    // 列表图片缩小
    closeBigImg () {
      this.bigImg.show = false;
      this.bigImg.hide = true;
    },
    // 旋转图片
    rotate () {
      switch (this.deg) {
        case 0:
          this.deg = 90;
          this.$refs.is.style = "left:0";
          this.$refs.rotate.style = "top:40px;right:-20px";
          this.$refs.rotate.style.transform = "rotate(-90deg)";
          break;
        case 90:
          this.deg = 180;
          this.$refs.is.style = "bottom:0;left:0;top:unset";
          this.$refs.rotate.style = "top:10px;left:10px";
          this.$refs.rotate.style.transform = "rotate(-180deg)";
          break;
        case 180:
          this.deg = 270;
          this.$refs.is.style = "bottom:0;right:0;top:unset";
          this.$refs.rotate.style = "bottom:40px;left:-20px;top:unset";
          this.$refs.rotate.style.transform = "rotate(-270deg)";
          break;
        case 270:
          this.deg = 0;
          this.$refs.is.style = "top:0;right:0;";
          this.$refs.rotate.style = "bottom:10px;right:10px;top:unset";
          this.$refs.rotate.style.transform = "rotate(0deg)";
          break;
      }

      this.$refs.image.style.transform = `rotate(${this.deg}deg)`;
      // this.$refs.is.style = "left:0";
    },
    handleScroll () {
      this.bigImg.show = false;
      this.bigImg.hide = true;
    },
    // 列表出现时，登录/注册页面消失。
    closePage () {
      // this.size = "50%";
      this.$store.state.loginShow = false;
      this.$store.state.registerShow = false;
    },
    // 获取数据列表
    getList () {
      this.$axios({
        method: "GET",
        url: "/api/xwProduct/back",
        params: {
          state: 0,
          sort: "sort,desc"
        }
      })
        .then(res => {
          this.productList = res.data.content;
          this.loading = false;
          console.log("666sss", res);
          // console.log("22444442", this.productList);
          this.productList.forEach((item, index) => {
            this.orderList[index] = {
              productId: item.productId,
              price: 0,
              orderNumber: null,
              product: item
            };
          });

          if (this.listInfo) {
            const info = JSON.parse(this.listInfo);
            // info.forEach((item, index) => {
            //   this.orderList[index].orderNumber = item.orderNumber;
            // });

            info.forEach((every, nums) => {
              this.orderList.forEach((items, indexs) => {
                if (every.product.id == items.product.id) {
                  this.orderList[indexs].orderNumber = every.orderNumber;
                }
              });
            });
            console.log("ppssppss", this.orderList);
          }

          console.log("lllllll", this.orderList);
        })
        .catch(err => {
          console.log(err);
        });
    },

    onSubmit () {
      console.log("...", this.orderList);
      this.$store.state.checkOrder = true;
      this.$store.state.againOrder = false;
      const a = this.orderList.filter(item => {
        return item.orderNumber;
      });
      console.log(a);
      var prolist = JSON.stringify(a);
      console.log("4444444", a);
      window.sessionStorage.setItem("listInfo", prolist);
      if (!this.token) {
        this.$message.error("请登录！");
        this.$router.push("/login");
        this.$store.state.loginShow = true;
        this.drawer = false;
      }
      if (a.length === 0 && this.token) {
        this.$message.error("错误，订单不能为空");
      } else {
        this.$router.push("/order");
        this.drawer = false;
      }
    },
    scrool (e) {
      var cHeight = document.documentElement.clientHeight;
      var muilt = this.muilt++;
      var paddingNum = muilt * 60;
      if (paddingNum >= cHeight) {
        this.$refs.fatList.style.paddingTop = `${cHeight}px`;
      } else {
        this.$refs.fatList.style.paddingTop = `${paddingNum}px`;
      }
    },
    scrools () {
      var cHeight = document.documentElement.clientHeight;
      var muilts = this.muilts++;
      var paddingNums = muilts * 60;
      if (paddingNums >= cHeight) {
        this.$refs.listT.style.paddingTop = `${cHeight}px`;
      } else {
        this.$refs.listT.style.paddingTop = `${paddingNums}px`;
      }
    },
    add () {
      this.drawer = true;
      this.imgShow = false;
      this.$refs.prolist.classList.add('leave')
      // this.leave()
      // this.$refs.prolist.classList.add('leave')
      // this.$refs.arrow.classList.add('arrowBlock');
      // this.$refs.prolist.classList.add('bounceOutRight');
      this.size = "100%";
      this.muilt = 1;
      this.$nextTick(() => {
        if (this.$refs.fatList) {
          this.$refs.fatList.style.paddingTop = "60px";
        }
        if (this.$refs.listT) {
          this.$refs.listT.style.paddingTop = "60px";
          this.muilts = 1;
        }
      });
    },
    endPrice (productPrices, index) {
      if (productPrices.length > 1) {
        for (var i = 0; i < productPrices.length; i++) {
          if (
            this.orderList[index].orderNumber >=
            productPrices[i].productNumber &&
            this.orderList[index].orderNumber <
            productPrices[i + 1].productNumber
          ) {
            return productPrices[i].price;
          } else if (
            this.orderList[index].orderNumber >=
            productPrices[productPrices.length - 1].productNumber
          ) {
            return productPrices[productPrices.length - 1].price;
          }
        }
      }
      return productPrices[0].price;
    },
    showImg (imgurl, e) {
      this.img = `${imgurl}_resize_?w=1000&h=1000`;
      this.bigImg.show = true;
      this.bigImg.hide = false;
      var intX = window.event.clientX;
      var intY = window.event.clientY;
      var allH = document.body.clientHeight;
      console.log("allh", allH);
      // 设置大图左上角起点位置
      this.$refs.bigImg.style.left = intX - 150 < 0 ? 0 : intX - 150 + "px";
      this.$refs.bigImg.style.top = intY - 150 < 0 ? 0 : intY - 150 + "px";
    },
    hideImg (e) {
      this.bigImg.show = false;
      this.bigImg.hide = true;
    },

    closeDrawer () {
      this.$store.state.loginShow = false;
      this.$store.state.registerShow = false;
      this.drawer = false;
    }
  }
};
</script>
<style scoped lang="less">
html {
  overflow-x: hidden;
}
.list-li {
  padding-top: 100vh;
}
.table-box {
  max-width: 50%;
  margin: 0 auto;
  // overflow: hidden;
  // overflow-y: auto;
  .scoll-box {
    width: 100%;
    // margin-top: 80px;
  }
  .tr {
    position: fixed;
    width: 1745px;
    z-index: 999;
  }
  .tr,
  .tr_container {
    width: 100%;
    background: #def4f1;
    font-size: 16px;
    // background:#f7f7f7;
    // background: #E9E9EE;
    // background: #f5f7fa;
    // &:nth-child(odd) {
    //   background: #ffffff;
    // }
    // &:nth-child(even) {
    //   background: #e9e9ee;
    // }
    // &:hover {
    //   background: #fff;
    // }

    // background: linear-gradient(to right,#29a6ff,#99f0ff);
    display: flex;
    // justify-content: space-between;
    margin-bottom: 10px;
    border-radius: 3px;
    > div {
      height: 40px;
      text-align: left;
      line-height: 40px;
    }
    .logins {
      width: 8%;
      .smallImg {
        margin: 2px auto;
      }
    }
    .names {
      width: 30%;
    }
    .prices {
      width: 10%;
    }
    .describes {
      width: 40%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .numbers {
      width: 180px;
      input {
        background: #ffffff;
        border: 1px solid #7c7575;
      }
    }
  }

  /deep/.el-table {
    margin: 0 auto;
    overflow: hidden;
    overflow-y: scroll;
  }
}
.viewer-toolbar > ul > .viewer-large {
  display: none !important;
}
.grid {
  width: 113.99px;
  height: 89.93px;
}
.list-table {
  max-width: 1745px;
  margin: 0 auto;
  // padding-top: 1000px;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 124px;
    padding: 5px;
    background: #def4f1;
    // margin-right: 5px;
    margin-right: 10px;

    margin-bottom: 15px;
    border-radius: 5px;
    input {
      background: #def4f1;
      border: 1px solid #7c7575;
    }
    > .imgs {
      border-radius: 5px;
      overflow: hidden;
      width: 112px;
      height: 84px;
      position: relative;
      img {
        width: 100%;
        // object-fit: fill;
        // object-fit: contain;
        // object-fit: scale-down;
        // image-rendering: -moz-crisp-edges; /* Firefox */
        // image-rendering: -o-crisp-edges; /* Opera */
        // image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
        // image-rendering: crisp-edges;
        // -ms-interpolation-mode: nearest-neighbor; /* IE /(non-standard property) */
      }
      .aa {
        width: 114px;
        height: 85px;
        position: absolute;
        background: #ccc;
        z-index: 99;
        top: 0;
        visibility: hidden;
      }
    }

    .title {
      width: 100%;
      overflow: hidden;
      margin-top: 10px;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .price {
      margin-top: 5px;
      font-size: 12px;
    }
    .describe {
      width: 100%;
      overflow: hidden;
      // height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 5px;
      font-size: 12px;
    }
    .input {
      margin-top: 5px;
      margin-bottom: 5px;
      .el-input {
        text-align: center;
        width: 90px;
        height: 25px;
        padding: 0;
        border: 1px solid #7c7575;
        border-radius: 5px;
        outline: none;
        &:focus {
          border: 1px solid #409eff;
          outline: none;
        }
      }
    }
  }
}
.smallImg {
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    object-fit: fill;
    object-fit: contain;
    object-fit: scale-down;
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: -o-crisp-edges; /* Opera */
    image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
  }
}
.el-input {
  text-align: center;
  width: 90px;
  height: 25px;
  padding: 0;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  outline: none;
  &:focus {
    border: 1px solid #409eff;
    outline: none;
  }
}

.divs {
  display: flex;
  flex-wrap: wrap;
  div {
    height: 300px;
    width: 500px;
  }
}
.container {
  background: #f5f5f5;
  margin-right: 10px;
  padding-top: 10px;
  border-radius: 5px;
  transition: 0.65s;
  &:hover {
    transform: translateZ(60deg);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}
.big-imgs {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
.mengceng {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background-color: rgba(128, 128, 128, 0.7);
}
.bigImgs {
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

  .rotate-box {
    display: flex;
    justify-content: center; //实现水平居中
    align-items: center;
    position: relative;
    transition-duration: 2s;
    &:hover .rotate {
      display: block;
    }
    > i {
      z-index: 999;
      transition: 1s;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 35px;
      color: #ffcc00;
    }
  }
  .rotate {
    display: none;
    position: absolute;
    right: 10px;
    bottom: 10px;
    height: 60px;
    width: 120px;
    border: 1px solid #ccc;
    line-height: 60px;
    text-align: center;
    z-index: 99;
    font-size: 30px;
    color: #ffcc00;
    border-radius: 5px;
    background-color: rgba(128, 128, 128, 0.7);
  }
  > i {
    z-index: 999;
    transition: 1s;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 35px;
    color: #ffcc00;
  }
}
.box {
  overflow: hidden;
  position: relative;
}
.followm {
  // width: 500px;
  border-radius: 5px;
}
.hide {
  display: none;
}
.img_box {
  width: 100%;
  .imgs {
    width: 100%;
  }
}
.show {
  position: fixed;
  // pointer-events: none;

  display: block;
}
/deep/ .el-drawer {
  //  background:rgba(224, 230, 235,0.8);
  // background: linear-gradient(to bottom, #ccc, #e2e2e2, #f7f7f7);
  background: transparent;
  overflow-y: scroll;
}

/deep/ .el-card__body {
  padding: 10px;
}
.left {
  width: 100%;
  display: inline-block;
  text-align: right;
  // overflow: hidden;
  // border-radius: 50%;
  width: 1005;
  .tile {
    height: 40px;
    background-color: #fff;
    text-align: center;
    line-height: 40px;
  }

  // &:hover img{
  //   transform: scale(2);
  // }
  // &:hover .right{
  //   display: block;
  //   background: rgba(0, 0, 0, .8);
  // }
}
.right {
  display: inline-block;
  line-height: 35px;
  margin-top: 20px;
  height: 35px;
  width: 100px;
  vertical-align: bottom;
  text-align: center;
  box-sizing: border-box;
  background-color: #fff;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.rightBlock {
  display: inline-block !important;
}

.imgbox {
  width: 100%;
  position: relative;
  height: 106px;
  overflow: hidden;
  .icon-icon {
    position: absolute;
    /* z-index: 99; */
    right: 0;
    bottom: 4px;
    color: #fff;
    font-size: 20px;
  }
  .img {
    position: absolute;
    width: 100%;
    vertical-align: bottom;
  }
}

.orderText {
  color: #666;
  text-align: left;
  // overflow: hidden;
  p {
    width: 100%;
    white-space: nowrap;
    margin: 5px 0px;
    font-size: 13px;
    overflow: hidden;
    height: 18px;
    color: #000;
    text-overflow: ellipsis;
  }
  input {
    border-radius: 5px;
    margin-top: 7px;
    background-color: transparent;
    // border-radius: 10px;
    outline: none;
    border: 1px solid #666;
    width: 60%;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    text-align: center;
    padding: 0;
    margin: 0;
  }
}
.el-row {
  margin-top: 20px;
  margin-left: 125px;
  padding: 0 90px;
  height: 100vh;
}
.el-col {
  margin-bottom: 20px;
}
.prolist {
  // display: none; //产品列表第一版
  position: fixed;
  right: 0;
  bottom: 150px;
}
.prolistBlock {
  display: block !important;
}

.foot {
  width: 100%;
  background-color: #f0f3f5;
  height: 125px;
  text-align: center;
  padding-top: 30px;
  position: fixed;
  bottom: 0;
  .btn {
    width: 325px;
    height: 46px;
    outline: none;
    border: none;
    background-color: #fff;
    color: #0758d8;
    border-radius: 23px;
    font-size: 20px;
  }
}
.tright {
  width: 80px;
  height: 40px;
  // background-color: #fff;
  background: #7459dc;
  color: #fff;
  margin-bottom: 10px;
  border-radius: 25px;
  text-align: center;
  padding-top: 5px;

  .icon-shouqi2 {
    font-size: 20px;
  }
}
.list-top {
  position: fixed;
  right: 0;
  top: 55px;
  line-height: 40px;
  // padding-top: 0;
  .libiao {
    font-size: 25px;
  }
  .biaoge {
    font-size: 25px;
  }
}
.trBtn {
  position: fixed;
  bottom: 0;
  right: 0;
}
.subBtn {
  border: none;
  // background-color: #fff;
  color: #fff;
  background: #41b3ff;
  border-radius: 25px;
  margin-bottom: 10px;
  width: 80px;
  font-size: 14px;
  text-align: center;
  // border-top: 1px solid #666;
  height: 40px;
  font-weight: 700;
  outline: none;
  // color: #666;
}

//去除input type=number 的默认样式
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input[type='number'] {
  -moz-appearance: textfield;
}
@keyframes move {
  0% {
    left: 0%;
    opacity: 0;
  }
  50% {
    left: 50%;
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}
.move {
  -webkit-animation-name: move;
  animation-name: move;
  // position: relative;
  // margin-left: -25px;
  font-size: 15px;
  color: #fff;
}
.ar-animated {
  margin-left: -10px;
  color: #fff;
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  font-style: inherit;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}
.ar-delay-1s {
  animation-delay: 0.1s;
}
.ar-delay-2s {
  animation-delay: 0.2s;
}
.ar-delay-3s {
  animation-delay: 0.3s;
}
.ar-delay-4s {
  animation-delay: 0.4s;
}
.ar-delay-5s {
  animation-delay: 0.5s;
}
.ar-delay-6s {
  animation-delay: 0.6s;
}
.ar-delay-7s {
  animation-delay: 0.7s;
}
.ar-delay-8s {
  animation-delay: 0.8s;
}
.ar-delay-9s {
  animation-delay: 0.9s;
}
.ar-delay-10s {
  animation-delay: 0.1s;
}
.arrow {
  position: fixed;
  width: 50px;
  display: none;
  right: 35px;
  bottom: 180px;
  // text-align:right;
}
.btt {
  overflow-x: hidden;
}
.arrowBlock {
  display: block !important;
}



// 产品列表第二版
.prolist{
  width: 120px !important;
  height: auto !important;
  bottom: 120px !important;

  transition:.8s;
}
.leave{
  right: -85px;
  // bottom: 88.5px !important;
}
.enter{
  
}
.product-list{
  color: #ffffff;
  background:#fff;
  // padding:5px;
  box-sizing: border-box;
  // border-top-left-radius: 3px;
  // border-bottom-left-radius: 3px;
  position: relative;
  >.product-icon{
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    font-size: 16px;
    color: #000;
    >i{
      font-size: 25px;
    }
  }
  .product-img{
    width: 100%;
    position: absolute;
    top: 35px;
    img{
      width: 100%;
    }
  }
}
</style>
