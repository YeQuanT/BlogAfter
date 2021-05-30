<template>
  <div class="components-container" style="padding: 20px">
    <md-input
      v-model="title"
      icon="el-icon-search"
      name="title"
      placeholder="输入标题"
    >
      标题
    </md-input>
    <br />
    <md-input
      v-model="title"
      icon="el-icon-search"
      name="title"
      placeholder="输入描述内容"
    >
      描述内容
    </md-input>
    <br />
    <div class="editor-container">
      <markdown-editor
        ref="markdownEditor"
        v-model="content"
        :language="language"
        height="400px"
      />
    </div>

    <el-button
      style="margin-top: 50px"
      type="primary"
      icon="el-icon-document"
      @click="getHtml"
    >
      提交
    </el-button>
  </div>
</template>

<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import MdInput from "@/components/MDinput";
export default {
  name: "MarkdownDemo",
  components: { MarkdownEditor, MdInput },
  data() {
    return {
      title: "",
      describe: "",
      content: "",
      html: "",
      languageTypeList: {
        en: "en_US",
        zh: "zh_CN",
        es: "es_ES",
      },
    };
  },
  computed: {
    language() {
      return this.languageTypeList["zh"];
    },
  },
  methods: {
    getHtml() {
      if(this.title&&this.describe&&this.content){
        console.log("ok");
      console.log(this.html);
      }
    },
  },
};
</script>

<style scoped>
.editor-container {
  margin-bottom: 30px;
}
.tag-title {
  margin-bottom: 5px;
}
</style>
