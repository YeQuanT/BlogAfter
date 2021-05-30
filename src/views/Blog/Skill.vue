<template>
  <div style="margin: 20px">
    <button class="pan-btn blue-btn" @click="add">增加技能</button>
    <div style="margin-top: 20px">
      <ElForm>
        <ElFormItem
          v-for="(item, index) in list"
          :key="index"
          :label="item.name"
          label-width="50px"
        >
          <el-progress
            :percentage="item.percentage"
            :stroke-width=50
            :text-inside="true"
            :color="customColors"
          ></el-progress>
          <p>
            <md-input
              v-model="item.content"
              icon="el-icon-search"
              name="title"
              placeholder="简述"
              @blur="setSkill(item._id,2,index,item.content)"
            >
              简述
            </md-input>
          </p>
          <p style="text-align: center">
            <el-button v-waves type="success" @click="item.percentage<100?setSkill(item._id,1,index):''"
              >+</el-button
            >
            <el-button v-waves type="danger" @click="item.percentage>0?setSkill(item._id,0,index):''"
              >-</el-button
            >
          </p>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>
<script>
import waves from "@/directive/waves/index.js"; // 水波纹指令
import MdInput from "@/components/MDinput";
import { addSkill, getSkill, setSkill } from "@/api/blog";

export default {
  data() {
    return {
      percentage: 20,
      customColor: "#409eff",
      list: [],
      customColors: [
        { color: "#8ae1ce", percentage: 10 },
        { color: "#d1e5a6", percentage: 20 },
        { color: "#ffdf96", percentage: 30 },
        { color: "#f9877c", percentage: 40 },
        { color: "#ccabda", percentage: 50 },
        { color: "#db2965", percentage: 60 },
        { color: "#ec6091", percentage: 70 },
        { color: "#f2a7be", percentage: 80 },
        { color: "#99e3e1", percentage: 90 },
        { color: "#15a5a6", percentage: 100 },
      ],
    };
  },
  created () {
    this.init()  
  },
  directives: {
    waves,
  },
  components: { MdInput },
  methods: {
      init(){
          getSkill().then(res=>{
              this.list = res.list
          })
      },
    add() {
      this.$prompt("技能名称", "新的技能", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        addSkill({ name: value }).then((res) => {
          console.log("增加技能", res);
          this.$message({
            type: res.status,
            message: res.msg,
          });
        });
      });
    },
    setSkill(_id,code,index,content=null){
        setSkill({_id,code,content}).then(res=>{
           code === 2?this.list[index].content = res.is.content:this.list[index].percentage = res.is.percentage
            console.log("修改技能",res);
        })
    }
  },
};
</script>
<style scoped>
</style>