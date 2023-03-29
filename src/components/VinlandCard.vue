<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h2>🗡VINLAND BLOG👑</h2>
            </div>
        </template>

        <div class="card-body">
            <p class="title">{{title}}</p>
            <slot>Form-content</slot>
        </div>
    </el-card>
</template>

<script>
    export default{
        name: "VINLAND BLOG",
        props: {
            title: {
                type: String,
                require:true
            }
        }
    }
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Kanit:900);

.card-header{
    justify-content: space-between;
    align-items: center;
    text-align: center;
    height: 35px;
}

.el-card_header{
    padding-top: 0px;
}

.card-body{
    padding: 0px 20px;
}

.card-header h2 {
    font-family: "Kanit";
}

.card-body h3,
.card-body p{
    text-align: center;
}

.card-body h3{
    margin-top: 0px;
}

.text-muted{
    color: #627d98;
}

.box-card{
    width: 460px;
    border: 1px solid transparent;
    border-radius: 10px;
    box-shadow: none !important;
    margin: 0 auto;
}

.m-2 {
    margin-top: 10px;
}
.m-3 {
    margin-top: 15px;
}
.title {
    font-size: 20px;
    color: #627d98;
    margin-top: 0px;
}



</style>