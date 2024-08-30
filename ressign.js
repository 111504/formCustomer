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
reassignButton.addEventListener("click",function(){
   const selectDepartment=departmentSelect.options[departmentSelect.selectedIndex].textContent;
   const selectPerson=personSelect.options[personSelect.selectedIndex].textContent;

   console.log(`重新指定为：部门=${selectDepartment}, 人员=${selectPerson}`);
   //更新顯示選擇的職位和人員名稱
   itemPosition.textContent=selectDepartment;
   itemName.textContent=selectPerson;
})

  departmentSelect.addEventListener("change",function(){
    const selectedDepId=departmentSelect.value;
    console.log("selectedDepId=",selectedDepId)
    //根據部們id ，動態獲取部門人員的列表
    get(`api/v1/persons?depId=${selectedDepId}`,(data)=>{
        console.log("get_person_success", data);

        //清空當前人員選擇框的選項
        personSelect.innerHTML="";

        //將新的人員列表添加到選項框中
        data.forEach((persons)=>{
            const option=document.createElement("option");
            option.value=persons.id;
            option.textContent=persons.name;
            console.log('添加選項',option)
            personSelect.appendChild(option);
        })
        console.log('personSelect=',personSelect)
    })
  })
  return stationDiv;
}

//獲取部們列表 並填充到選擇框內
function populateDepartments(departmentSelect) {
    get(`api/v1/department`, (data) => {
      console.log("get_department_success", data);
      
      data.forEach((item) => {
        const department = document.createElement("option");
        department.value = item.depId;
        department.textContent = item.depName;
        departmentSelect.appendChild(department);
      });
  
      // 默认选择第一个部门并触发 change 事件来加载人员
      if (departmentSelect.options.length > 0) {
        departmentSelect.value = departmentSelect.options[0].value;
        departmentSelect.dispatchEvent(new Event('change'));
      }
    });
  }



const formId = "123"; // 假设formId是123
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
    const departmentSelect = newStation.querySelector(".form-reassign-department");
    populateDepartments(departmentSelect);
  });
});

