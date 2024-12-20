<!--
 * @Author      : Mr.bin
 * @Date        : 2024-12-17 11:58:39
 * @LastEditTime: 2024-12-18 15:42:04
 * @Description : 修改中心距评定上下限
-->
<template>
  <div class="set-centerSpacingMinMax">
    <el-page-header
      class="page"
      title="返回首页"
      content="修改中心距评定的上下限"
      @back="handleToHome"
    ></el-page-header>

    <div class="box">
      <div class="ps">
        【必须注意：修改数值时，min值不能大于max值，否则会导致计算出错Bug】
      </div>

      <el-row class="row">
        <el-col :span="6">
          <div class="item title">规格型号(加长/非加长)</div>
        </el-col>
        <el-col :span="9">
          <div class="item title">中心距-min小值</div>
        </el-col>
        <el-col :span="9">
          <div class="item title">中心距-max大值</div>
        </el-col>
      </el-row>

      <el-row
        class="row"
        v-for="(item, index) of centerSpacing_min_max"
        :key="index"
      >
        <el-divider></el-divider>
        <el-col :span="6">
          <div class="item">{{ item.gx }}</div>
        </el-col>
        <el-col :span="9">
          <div class="item">
            <el-input-number
              v-model="item.centerSpacing_min"
              :precision="0"
            ></el-input-number>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="item">
            <el-input-number
              v-model="item.centerSpacing_max"
              :precision="0"
            ></el-input-number>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-divider></el-divider>

    <!-- 按钮组 -->
    <div class="btn">
      <el-button class="item" type="danger" @click="handleToHome"
        >返回首页</el-button
      >
      <el-button
        class="item"
        type="success"
        @click="handleSaveCenterSpacingMinMax"
        >保 存</el-button
      >
      <el-button class="item" type="primary" @click="handleRefresh"
        >刷新页面</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'set-centerSpacingMinMax',

  data() {
    return {
      centerSpacing_min_max: []
    }
  },

  created() {
    this.getCenterSpacingMinMax()
  },

  methods: {
    /**
     * @description: 回到首页
     */
    handleToHome() {
      this.$router.push({
        path: '/'
      })
    },

    /**
     * @description: 刷新页面按钮
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: JSON.stringify('/set-centerSpacingMinMax'),
          duration: JSON.stringify(300)
        }
      })
    },

    /**
     * @description: 获取中心距评定上下限
     */
    getCenterSpacingMinMax() {
      this.centerSpacing_min_max = JSON.parse(
        window.localStorage.getItem('centerSpacing_min_max')
      )
    },

    /**
     * @description: 保存按钮
     */
    handleSaveCenterSpacingMinMax() {
      window.localStorage.setItem(
        'centerSpacing_min_max',
        JSON.stringify(this.centerSpacing_min_max)
      )

      /* 成功 */
      this.$message({
        message: `中心距上下限修改成功`,
        type: 'success',
        duration: 2500
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.set-centerSpacingMinMax {
  width: 100%;
  height: 100%;
  position: relative;

  .page {
    position: absolute;
    top: 20px;
    left: 30px;
  }

  .box {
    width: 100%;
    padding: 50px 5px 0 5px;

    .ps {
      @include flex(row, center, center);
      font-size: 30px;
      color: red;
      font-weight: 700;
      margin: 5px 0;
    }

    .row {
      .title {
        font-weight: 700;
      }
      .item {
        height: 40px;
        @include flex(row, center, center);
        font-size: 24px;
      }
    }
  }

  .btn {
    @include flex(row, center, center);
    .item {
      margin: 10px 60px;
      font-size: 28px;
    }
  }
}
</style>
