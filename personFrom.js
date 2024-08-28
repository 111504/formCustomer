$(document).ready(function() {
    $('#myTable').DataTable();

     // 绑定点击事件到審核按钮
//  $('#myTable').on('click', '.review-btn', function() {
//     alert('您即將進行審核操作！');
// });

    // 获取模态框元素
    var modal = document.getElementById("reviewModal");
    let submitBtn=document.getElementsByClassName("submit-btn")[0];
    // 获取关闭按钮元素
    var closeBtn = document.getElementsByClassName("close-btn")[0];
    var reassignModal = document.getElementById("reassignModal");
    let cancelBtn = document.getElementById("cancel-btn");
    let confirmBtn = document.getElementById("confirm-btn");
    // 当用户点击審核按钮时，打开模态框
    $('#myTable').on('click', '.review-btn', function() {
        modal.style.display = "block";
    });

    // 当用户点击关闭按钮时，关闭模态框
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // 当用户点击模态框外部时，关闭模态框
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == reassignModal) {
            reassignModal.style.display = "none";
        }
    }

    // 处理文件上传标签显示
    $("#fileUpload").change(function() {
        var filename = $(this).val().split("\\").pop();
        $("#fileLabel").text(filename ? filename : "未選擇任何檔案");
    });


    // 提交按钮逻辑
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault(); // 阻止默认表单提交行为

        // 检查用户是否选择了“重新指定”
        if ($('input[name="action"]:checked').val() === "reasign") {
            reassignModal.style.display = "block";
        } else {
            // 处理其他逻辑
            alert('执行其他操作');
        }
    });

// 取消按钮逻辑
cancelBtn.onclick = function() {
    reassignModal.style.display = "none";
}

// 确认按钮逻辑
confirmBtn.onclick = function() {
    // 在这里处理确认后的操作，例如提交选择的代理人
    alert('确认重新指定操作');
    reassignModal.style.display = "none";
}

});