<template>
  <div class="components-container" style="padding: 20px">
    <!-- 标题，描述 -->
    <md-input
      v-model="Article.title"
      icon="el-icon-search"
      name="title"
      placeholder="输入标题"
    >
      标题
    </md-input>
    <br />
    <md-input
      v-model="Article.describe"
      icon="el-icon-search"
      name="describe"
      placeholder="输入描述内容"
    >
      描述内容
    </md-input>
    <br />

    <!-- 编辑器 -->
    <div>
      <tinymce v-model="Article.content" :height="300" ref="Tinymce" />
    </div>

    <!-- 动态标签 -->
    <div style="margin-top:20px">
     <p style="color:#666"> 选择你的文章标签？</p>
      <el-tag
        :key="tag"
        v-for="tag in Article.tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >+ New Tag</el-button
      >
    </div>

    <!-- 按钮 -->
    <div style="margin-top: 50px">
      <el-button v-waves type="primary" @click="submit"> 提交 </el-button>
      <el-popconfirm
        style="margin-left: 10px"
        title="确定清空？"
        @onConfirm="empty"
      >
        <el-button slot="reference"> 清空 </el-button>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import MdInput from "@/components/MDinput";
import waves from "@/directive/waves/index";
import { addArticle, getAarticle } from "@/api/blog";

const defaultArticle = {
  content: "",
  title: "",
  describe: "",
  tag:[]
};
export default {
  name: "TinymceDemo",
  components: { Tinymce, MdInput },
  data() {
    return {
      Article: Object.assign({}, defaultArticle),
        inputVisible: false,
        inputValue: ''
    };
  },
  directives: {
    waves,
  },
  created() {
    this.$route.params.id ? this.getArticle(this.$route.params.id) : "";
  },
  methods: {
    submit() {
      if (this.Article.title && this.Article.content && this.Article.describe) {
        addArticle(this.Article).then((res) => {
          this.$message({
            message: res.msg,
            type: res.code == 20000 ? "success" : "error",
          });
          res.code == 20000 && !this.Article._id
            ? (this.Article._id = res.data._id)
            : "";
        });
      } else {
        this.$message({
          message: "请输入内容：标题，描述，内容不能为空",
          type: "error",
        });
      }
    },
    empty() {
      this.Article = Object.assign({}, defaultArticle);
      this.$refs.Tinymce.setContent("");
      this.Article.tag = []
      console.log(this.Article);
    },
    getArticle(id) {
      console.log("编辑文章");
      getAarticle({ _id: id }).then((res) => {
        // let {content,describe,title} = res.data
        this.$refs.Tinymce.setContent(res.data.content);
        this.Article = res.data;
      });
    },
    handleClose(tag) {
        this.Article.tag.splice(this.Article.tag.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          console.log(this.Article.tag);
          this.Article.tag.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
  },
};
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

