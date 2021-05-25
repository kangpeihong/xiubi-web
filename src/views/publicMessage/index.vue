<template>
  <div class="common">
    <div class="common-message"><span>{{publicTime | formatData}}公告:</span> {{ info }}</div>

    <div class="express-message">
      <span>发货:</span>

      <div class="info">
        <ul :style="{'margin-top':height,}" :class="{ move: animate }" class="public-moudle"  ref='publicMoudle'>  <!-- :class="{ move: animate }"-->
          <li
            class="express-list"
            v-for="(item, index) in expressData"
            :key="index"
          >
            {{item.dateTime | formatData}}{{ item.info }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "../../assets/js/utils";

export default {
  name: "publicMessage",
  data() {
    return {
      info: "",
      msg: "",
      height:'',
      expressData: [],
      animate: false,
      publicTime:'',
      addressTime:''
    };
  },
  created() {
   




  },
  mounted(){

     this.$request.get(this.$api.newPublicMessage).then(res => {
      // console.log("ddd", res);
      this.info = res.data.info;
      this.publicTime = res.data.dateTime; 
    });

    this.$request.get(this.$api.publicMessage).then(res => {
      // console.log("dddsdsds", res);
      // this.info = res.data.info;
      this.expressData = res.data;
      if (this.expressData !== "" && this.expressData.length >3) {
        setInterval(this.beginMove, 3000);
      }

    });
    // setInterval(this.beginMove, 3000);

  },
  filters:{
    formatData(time){
       return utils.format(time, "yyyy-MM-dd");
    }
  },
  methods: {
    beginMove() {
      this.animate = true;
      let height = this.$refs.publicMoudle.children[0].offsetHeight;
      this.height = -(height+10)+'px'
     console.log('555555555555',this.$refs)
      setTimeout(() => {
        this.expressData.push(this.expressData[0]);
        this.expressData.shift();
         this.height = 0+'px'
        this.animate = false;
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.move {
  // margin-top: -120px;
  transition: all 1s;
}

.common {
  width: 320px;
  height: 450px;
  color: #fff;
  // background: #ccc;
  // border: 1px solid #000;
  border-radius: 3px;
  position: absolute;
  padding: 15px 15px;
  box-sizing: border-box;
  // top: 400px;
  bottom: 45px;
  left: 50px;
  overflow: hidden;

  .express-message {
    margin-top: 30px;

    .info {
      border-top: 1px solid transparent;
      height: 298px;
      overflow: hidden;
      // position: relative;
      ul {
        // position: absolute;
        // transition: all 1s;
        // top: 0;
        li {
          font-size: 14px;
        }
      }
    }
    ul {
    }
    .express-list {
      margin-top: 10px;
      // height: 110px;
    }
  }
}
</style>
