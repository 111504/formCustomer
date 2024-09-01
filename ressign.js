// api ->回傳該表單的預設站點資訊
// function 帶入站點總站數 第n站 每站簽核人 職位

// 动态生成一个 form-reassign-station 并添加到父容器

/*
 api 回傳學校組織
 使用第一筆處室作為預設
 回傳 該處室的人員名單填入人員列表
*/
import { get } from "./net/request.js";

let formSection = document.getElementsByClassName("form-reassign-sign")[0];
/*
 *動態創建
 */
function createReassignStation(
  stationNumber,
  position,
  name,
  departments,
  persons
) {
  //創建 form-reassign-station
  const stationDiv = document.createElement("div");
  stationDiv.className = "form-reassign-station";

  // 创建和添加 form-item 元素
  const itemNumber = document.createElement("div");
  itemNumber.className = "form-item";
  itemNumber.textContent = stationNumber;
  stationDiv.appendChild(itemNumber);

  const itemPosition = document.createElement("div");
  itemPosition.className = "form-item";
  itemPosition.textContent = position;
  stationDiv.appendChild(itemPosition);

  const itemName = document.createElement("div");
  itemName.className = "form-item";
  itemName.textContent = name;
  stationDiv.appendChild(itemName);

  //部門選擇框
  const departmentSelect = document.createElement("select");
  departmentSelect.className = "form-item form-reassign-department";
  stationDiv.appendChild(departmentSelect);

  // 创建和添加人员 select 元素
  const personSelect = document.createElement("select");
  personSelect.className = "form-item form-reassign-person";
  stationDiv.appendChild(personSelect);

  // 创建和添加重新指定按钮
  const reassignButton = document.createElement("div");
  reassignButton.className = "form-reasign-button form-item";
  reassignButton.textContent = "重新指定";
  stationDiv.appendChild(reassignButton);

  //綁定指定按鈕點擊事件
  reassignButton.addEventListener("click", function () {
    // const selectDepartment =
    //   departmentSelect.options[departmentSelect.selectedIndex].textContent;
    const selectPerson =
      personSelect.options[personSelect.selectedIndex].textContent;
    const selectPosition =
      personSelect.options[personSelect.selectedIndex].dataset.position;

    console.log(`重新指定为：位階=${selectPosition}, 人員=${selectPerson}`);
    //更新顯示選擇的職位和人員名稱
    itemPosition.textContent = selectPosition;
    itemName.textContent = selectPerson;
  });

  departmentSelect.addEventListener("change", function () {
    const selectedDepId = departmentSelect.value;
    console.log("selectedDepId=", selectedDepId);
    //根據部們id ，動態獲取部門人員的列表
    get(`api/v1/persons?depId=${selectedDepId}`, (data) => {
      console.log("get_person_success", data);

      //清空當前人員選擇框的選項
      personSelect.innerHTML = "";

      //將新的人員列表添加到選項框中
      data.forEach((persons) => {
        const option = document.createElement("option");
        option.value = persons.staffCode; //身分代號
        option.textContent = persons.staffName; //姓名
        option.dataset.position = persons.position; //位階
        option.dataset.staffCode = persons.staffCode;
        personSelect.appendChild(option);
      });
      console.log("personSelect=", personSelect);
    });
  });
  return stationDiv;
}

//獲取部們列表 並填充到選擇框內
function populateDepartments(departmentSelect) {
  get(`api/v1/department`, (data) => {
    console.log("get_department_success", data);

    data.forEach((item) => {
      const department = document.createElement("option");
      department.value = item.orgCode;
      department.textContent = item.orgName;
      departmentSelect.appendChild(department);
    });

    // 默认选择第一个部门并触发 change 事件来加载人员
    if (departmentSelect.options.length > 0) {
      departmentSelect.value = departmentSelect.options[0].value;
      departmentSelect.dispatchEvent(new Event("change"));
    }
  });
}

const formId = "123"; // 假设formId是123

function initFormAssignStation() {
  get(`api/v1/forms/formId?formId=${formId}`, (data) => {
    console.log("getsuccess", data);
    data.forEach((element) => {
      const newStation = createReassignStation(
        element.index,
        element.jobtitle,
        element.name
      );
      formSection.appendChild(newStation);

      //創建站點表單後，填充部們訊息
      const departmentSelect = newStation.querySelector(
        ".form-reassign-department"
      );
      populateDepartments(departmentSelect);
    });
    //createSubmit();
    //bindFormSubmit();
  });
}

function createSubmit() {
  const stationDiv = document.getElementsByClassName("form-reassign-sign")[0];
  const submitDiv = document.createElement("div");
  const submitBtn = document.createElement("button");
  submitDiv.className = "form-submit-div";
  submitBtn.type = "submit";
  submitBtn.className = "form-submit-button";
  submitBtn.textContent = "提交";
  submitDiv.appendChild(submitBtn);
  stationDiv.appendChild(submitDiv);
}

function bindFormSubmit() {
  //綁定表單提交事件
  document
    .querySelector(".form-submit-button")
    .addEventListener("click", function (event) {
      event.preventDefault(); // 阻止表单默认提交
      console.log("點擊");
      // 提取表单内容到对象中
      const formData = {
        applicant: document.querySelector("#applicant").value,
        purchaseDate: document.querySelector("#purchase-date").value,
        purchaseNo: document.querySelector("#purchase-no").value,
        purchaseDept: document.querySelector("#purchase-dept").value,
        companyName: document.querySelector("#company-name").value,
        vendorNo: document.querySelector("#vendor-no").value,
        items: [] // 初始化 items 数组
      };
      document.querySelectorAll(".item-row").forEach((row) => {
        const item = {
          itemCode: row.querySelector(`input[name="item-code-1"]`).value,
          itemName: row.querySelector(`input[name="item-name-1"]`).value,
          itemQty: row.querySelector(`input[name="item-qty-1"]`).value,
          itemPrice: row.querySelector(`input[name="item-price-1"]`).value,
          itemAmount: row.querySelector(`input[name="item-amount-1"]`).value
        };
        formData.items.push(item); // 将每一项添加到 items 数组中
      });
      // 备注
      formData.remarks = document.querySelector("#remarks").value;
      // 将表单数据转换为 JSON
      const jsonData = JSON.stringify(formData);

      console.log("表單內容", jsonData);
    });
}

//initFormAssignStation();
createSubmit();
bindFormSubmit();
