<template>
  <view class="container">
    <u-overlay :show="showLoading" opacity="0.7">
      <view class="warpLoading">
        <u-loading-icon></u-loading-icon>
      </view>
    </u-overlay>
    <div class="warp">
      <div class="nowDate">
        <span class="title_time">当前时辰：</span>
        <span class="time_time">{{
          `${almanacData.ganZhiYear || ''} ${almanacData.ganZhiMonth || ''} ${
            almanacData.ganZhiDay || ''
          }`
        }}</span>
      </div>
      <div class="content">
        <p class="yi">
          <span class="title">宜</span>
          <span class="content_list">
            <span
              class="content_item"
              v-for="item in almanacData.yi"
              :key="item"
              >{{ item }}</span
            >
          </span>
        </p>
        <p class="ji">
          <span class="title">忌</span>
          <span class="content_list">
            <span
              class="content_item"
              v-for="item in almanacData.ji"
              :key="item"
              >{{ item }}</span
            >
          </span>
        </p>
      </div>
      <div class="header">
        <div class="item">
          <span class="title">五行</span>
          <span class="text">{{ almanacData.wuxing }}</span>
        </div>
        <div class="item second">
          <span class="title">冲煞</span>
          <span class="text">{{ almanacData.chong }}</span>
        </div>
        <div class="item">
          <span class="title">值神</span>
          <span class="text">{{ almanacData.zhiShen }}</span>
        </div>
      </div>
      <div class="timeList">
        <div class="titleTime">时辰吉凶</div>
        <div class="listTime">
          <div
            class="eItem"
            v-for="item in almanacData.shiChenJiXiong"
            :key="item"
          >
            {{ item.shiChen + item.jiXiong }}
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="left">
          <div class="left_title">建除十二神</div>
          <div class="right_text">{{ almanacData.jianchushiershen }}</div>
        </div>
        <div class="center">
          <div class="top">
            <div class="footer_left">
              <div class="footer_center_title">吉神宜趋</div>
              <div class="footer_center_text">
                <span
                  class="footer_center_item"
                  v-for="item in almanacData.jishenyiqu"
                  :key="item"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="footer_center">
              <div class="footer_center_title">今日胎神</div>
              <div class="footer_center_text">
                <span class="footer_center_item">{{
                  almanacData.taiShen
                }}</span>
              </div>
            </div>
            <div class="footer_right">
              <div class="footer_center_title">凶神宜忌</div>
              <div class="footer_center_text">
                <span
                  class="footer_center_item"
                  v-for="item in almanacData.xiongshenyiji"
                  :key="item"
                  >{{ item }}</span
                >
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom_title">彭祖百忌</div>
            <div class="bottom_text">{{ almanacData.pengzubaiji }}</div>
          </div>
        </div>
        <div class="right">
          <div class="left_title">二十八星宿</div>
          <div class="right_text">{{ almanacData.ershibaxingxiu }}</div>
        </div>
      </div>
      <div class="direction">
        <div class="item">
          <span class="title">喜神</span>
          <span class="text">{{ almanacData.xiShen }}</span>
        </div>
        <div class="item second">
          <span class="title">财神</span>
          <span class="text">{{ almanacData.caiShen }}</span>
        </div>
        <div class="item">
          <span class="title">福神</span>
          <span class="text">{{ almanacData.fuShen }}</span>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      almanacData: {},
      showLoading: false
    }
  },
  onShow() {
    this.getAlmanac()
  },
  methods: {
    getAlmanac() {
      this.showLoading = true
      request
        .get('https://qqlykm.cn/api/laohuangli/get', {
          key: 'jFWs0C6XIty0AHOgh3opeJHCvG'
        })
        .then(res => {
          if (res.success) {
            this.almanacData = res.data
          }
        })
        .finally(() => {
          this.showLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  box-sizing: border-box;
  ::v-deep .u-transition {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .warp {
    width: 95%;
    min-height: calc(100% - 20px);
    margin: 0 auto;
    border-radius: 20px;
    padding: 20px 10px;
    box-sizing: border-box;
    background: #fff;
    .nowDate {
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      .title_time {
        color: #9e5904;
        font-weight: 600;
        font-size: 18px;
        margin-right: 10px;
      }
    }
    .content {
      width: 100%;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      p {
        min-height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        .title {
          font-size: 16px;
          font-weight: 600;
          margin-right: 10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          line-height: 40px;
        }
        .content_list {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .content_item {
            width: 80px;
            height: 30px;
            border-radius: 10px;
            text-align: center;
            line-height: 30px;
            margin-right: 5px;
            margin-bottom: 5px;
            box-sizing: border-box;
          }
        }
        &.yi {
          .title {
            background-color: green;
          }
          border-bottom: 1px solid #eee;
        }
        &.ji {
          .title {
            background-color: rgb(145, 5, 5);
          }
        }
      }
    }
    .header {
      width: 100%;
      height: 80px;
      margin-top: 20px;
      border: 1px solid #9e5904;
      display: flex;
      justify-content: space-between;
      .item {
        width: 33%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .title {
          color: #9e5904;
          font-weight: 600;
          font-size: 16px;
        }
        &.second {
          border-left: 1px solid #9e5904;
          border-right: 1px solid #9e5904;
        }
      }
    }
    .timeList {
      border: 1px solid #9e5904;
      border-top: none;
      height: 90px;
      width: 100%;
      display: flex;
      .titleTime {
        width: 45px;
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        color: #9e5904;
        font-weight: 600;
        font-size: 16px;
        box-sizing: border-box;
        margin: 0 15px;
      }
      .listTime {
        width: calc(100% - 100px);
        height: 100%;
        display: flex;
        justify-content: space-between;
        .eItem {
          width: 13px;
          height: 100%;
          font-size: 13px;
          display: flex;
          align-items: center;
        }
      }
    }
    .footer {
      height: 300px;
      width: 100%;
      border: 1px solid #9e5904;
      border-top: none;
      display: flex;
      .left,
      .right {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        .left_title {
          width: 16px;
          height: 100%;
          display: flex;
          align-items: center;
          color: #9e5904;
          font-weight: 600;
          font-size: 16px;
        }
        .right_text {
          width: 14px;
          height: 100%;
          display: flex;
          align-items: center;
          font-size: 14px;
        }
      }
      .center {
        width: 60%;
        height: 100%;
        border-left: 1px solid #9e5904;
        border-right: 1px solid #9e5904;
        .top {
          height: 60%;
          border-bottom: 1px solid #9e5904;
          display: flex;
          > div {
            width: 33%;
            height: 100%;
            .footer_center_title {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 30%;
              color: #9e5904;
              font-weight: 600;
              font-size: 16px;
            }
            .footer_center_text {
              overflow: auto;
              font-size: 14px;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-evenly;
              .footer_center_item {
                width: fit-content;
                height: 20px;
              }
            }
          }
          .footer_center {
            border-left: 1px solid #9e5904;
            border-right: 1px solid #9e5904;
            text-align: center;
          }
        }
        .bottom {
          height: 40%;
          padding: 10px;
          box-sizing: border-box;
          width: 100%;
          > div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .bottom_title {
            color: #9e5904;
            font-weight: 600;
            font-size: 16px;
            height: 40%;
          }
          .bottom_text {
            height: 60%;
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }
    .direction {
      width: 100%;
      height: 80px;
      border: 1px solid #9e5904;
      display: flex;
      justify-content: space-between;
      border-top: none;
      .item {
        width: 33%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .title {
          color: #9e5904;
          font-weight: 600;
          font-size: 16px;
        }
        &.second {
          border-left: 1px solid #9e5904;
          border-right: 1px solid #9e5904;
        }
      }
    }
  }
}
</style>