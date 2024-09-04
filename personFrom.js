
import {post,get} from "./net/request.js"


 const currentId="FIN001";
 const currentIdOwn="HR001";
//const currentId="FIN003";
function formatDate(timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}
function getFormNeedToSign(currentId,table) {
    get(`api/v1/forms/formNeedToSign?currentApprovalId=${currentId}`, (data) => {
      console.log("get_form_need_to_sign", data);
        if(data){
            updateDataTable(data,table);
        }
        else{
            alert('搜尋結果為空')
        }
      
      
    });
  }

  function getFormFromOwn(currentApprovalId){
    get(`api/v1/forms/formOwnSub?currentApprovalId=${currentApprovalId}`, (data) => {
        console.log("get_form_from_own", data);
      });
  }
   // 更新 DataTable 資料
   function updateDataTable(data,table) {
    // 清空當前 DataTable
    table.clear();

    // 將 API 回傳的資料轉換為 DataTable 接受的格式
    var formattedData = data.map(function(item) {
        return [
            item.formId,
            item.submitter_id,
            formatDate(item.submitter_data),
            item.formtype,
            item.staffName,
        ];
    });
    console.log(formattedData)

    // 新增資料到 DataTable
    table.rows.add(formattedData);

    // 重新繪製 DataTable
    table.draw();
}

  $(document).ready(function() {


    var table = new DataTable('#myTable', {
        language: {
            url: '/locales/zh-HANT.json',  // 使用本地的語言文件路徑,
        },
        data:[],
        columns:[
            { title: "Form ID" },
            { title: "Submitter ID" },
            { title: "Submitter Data" },
            { title: "Form Type" },
            { title: "Staff Name" },
            { 
                title: "操作",  // 新增操作欄
                data: null,
                render: function(data, type, row) {
                    return `<button class="review-btn">審核</button>`;
                }
            },
        ]
    });

    
    getFormNeedToSign(currentId,table);

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

    // // 处理文件上传标签显示
    // $("#fileUpload").change(function() {
    //     var filename = $(this).val().split("\\").pop();
    //     $("#fileLabel").text(filename ? filename : "未選擇任何檔案");
    // });


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


  getFormFromOwn(currentIdOwn);

});




