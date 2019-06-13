<template>
  <div class="ball" :class="[type, 'ball' + number, opacity ? 'opacity' : '']">
    {{number}}
  </div>
</template>

<script>
export default {
  name: 'Ball',
  props: {
    type: {
      type: String,
      required: false,
      // normal,pk,k3,lhc
      default: 'normal'
    },
    number: {
      type: String,
      required: false,
      default: '1'
    },
    opacity: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .ball {
    width: 36px;
    height: 36px;
    line-height: 36px;
    margin-right: 3px;
    font-size: 16px;
    &.opacity {
      opacity: 0.1;
    }
    &.normal {
      background: #2d8cf0;
      color: #FFF;
      border-radius: 50%;
      &.ball大, &.ball双 {
        background: #ff9900;
      }
      &.ball小, &.ball单 {
        background: #515a6e;
      }
    }
    // pk10系列
    &.pk {
      border-radius: 4px;
      color: #FFF;
      font-size: 20px;
      font-weight: bold;
      @pkcolors: #e7de01,#0093dd,#4b4b4b,#ff7600,#15e2e5,#5234ff,#bfbfbf,#ff2600,#780b00,#07bf00;
      .pkcolor(@className, @color){
        &.ball@{className}{
          background: @color;
          -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
        }
      }
      .loop(@i) when (@i <= 20){
        .pkcolor(@i, extract(@pkcolors, mod(@i,11)));
        .loop(@i+1);
      }
      .loop(1);
      &.ball大, &.ball双 {
        background: #ff9900;
      }
      &.ball小, &.ball单 {
        background: #515a6e;
      }
    }
    // 快3系列
    &.k3 {
      color: transparent;
      background-size: 100%;
      .k3bkg(@i){
        &.ball@{i}{
          background-image: url('~@/assets/dice@{i}.png');
        }
      }
      .loop(@i) when (@i <= 6){
        .k3bkg(@i);
        .loop(@i+1);
      }
      .loop(1);
    }
    // 排列3系列
    &.pl3 {
      border-radius: 50%;
      color: #FFF;
      font-size: 20px;
      font-weight: bold;
      @pkcolors: #a8a5a5,#9076d2,#dba2ca,#8398cf,#7796ef,#83b6c2,#aecca5,#e0cd81,#ec9968,#eb6e3c;
      .plcolor(@className, @color){
        &.ball@{className}{
          background: @color;
        }
      }
      .loop(@i) when (@i <= 9){
        .plcolor(@i, extract(@pkcolors, @i + 1));
        .loop(@i+1);
      }
      .loop(0);
    }
  }
  @media screen and (max-width: 800px) {
    .ball {
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
