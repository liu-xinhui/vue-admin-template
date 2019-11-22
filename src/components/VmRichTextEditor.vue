<template>
  <div class="vm-editor-wrapper">
    <div id="toolbar" class="vm-editor-toolbar"/>
    <div id="editor" :style="{height:height}" class="vm-editor-editor"/>
  </div>
</template>

<script>
  import E from "wangeditor";

  const serverUrl = window.config.SERVER_URL;

  export default {
    props: {
      height: {
        type: String,
        default: "400px",
      },
    },
    data() {
      return {
        editor: null,
      };
    },
    mounted() {
      this.initEditor();
    },
    methods: {
      initEditor() {
        let editor = new E("#toolbar", "#editor");
        this.editor = editor;
        editor.create();
        editor.config.debug = true;
        editor.config.uploadImgServer = serverUrl + "files/upload/notice";
        editor.config.uploadFileName = "files";
        editor.config.uploadImgHooks = {
          customInsert: function(insertImg, result) {
            for (let url of result) {
              insertImg(serverUrl + url);
            }
          },
        };
      },
      setContent(content) {
        this.editor.txt.html(content);
      },
      getContent() {
        return this.editor.txt.html();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .vm-editor-wrapper {
    .vm-editor-toolbar {
      border-bottom: 1px solid #D8DCE5;
    }

    .vm-editor-editor {
      display: block;
      overflow: hidden
    }

    /deep/ .w-e-text {
      overflow-y: auto;
    }

    /deep/ .w-e-text-container .w-e-panel-container {
      border: 1px solid #D8DCE5;
      border-top: 0;
    }
  }
</style>
