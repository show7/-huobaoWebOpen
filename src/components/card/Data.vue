<template>
  <div class="card-data">
    <table v-if="type === 'normal'">
      <thead>
        <th colSpan="3">总和</th>
        <th colSpan="1">龙虎</th>
      </thead>
      <tbody>
        <td>32</td>
        <td>大</td>
        <td>双</td>
        <td>龙</td>
      </tbody>
    </table>

    <table v-if="type === 'pk'">
      <thead>
        <th colSpan="5">1-5龙虎</th>
        <th colSpan="3">冠亚和</th>
      </thead>
      <tbody>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
        <td>虎</td>
        <td>32</td>
        <td>大</td>
        <td>双</td>
      </tbody>
    </table>

    <table v-if="type === 'lhc'">
      <thead>
        <th colSpan="7">生肖</th>
        <th colSpan="7">五行</th>
      </thead>
      <tbody>
        <td>32</td>
        <td>大</td>
        <td>双</td>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
        <td>龙</td>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'LotteryCardData',
  props: {
    type: {
      type: String,
      required: false,
      default: 'normal'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .card-data {
    padding: 10px 30px;
    table {
      width: 100%;
      border-collapse: collapse;
      th,td {
        padding: 5px 0;
        border: 1px solid #e8eaec;
        font-size: 14px;
      }
      th {
        color: #ed4014;
      }
    }
  }
</style>
