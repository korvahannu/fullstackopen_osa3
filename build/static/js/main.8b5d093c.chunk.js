(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t.n(r),o=t(16),i=t.n(o),u=t(3),a=t(4),s=t.n(a),l="/api/persons",d=function(){return s.a.get(l).then((function(e){return e.data}))},j=function(e){return s.a.post(l,e).then((function(e){return console.log(e.data),e.data}))},b=function(e){s.a.delete("".concat(l,"/").concat(e)).then((function(e){return console.log(e)}))},f=function(e,n){return console.log(e+" and "+n),s.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))},m=t(0),h=function(e){var n=e.message;return null===n?null:Object(m.jsx)("div",{className:"notification",children:n})},O=function(e){var n=e.message;return null===n?null:Object(m.jsx)("div",{className:"error",children:n})},p=function(e){var n=e.filter,t=e.inputChange_filter;return Object(m.jsxs)("div",{id:"filter",children:["Filter ",Object(m.jsx)("input",{value:n,onChange:t})]})},x=function(e){return Object(m.jsxs)("form",{onSubmit:e.submitForm,children:[Object(m.jsxs)("div",{children:["Name ",Object(m.jsx)("input",{value:e.newName,onChange:e.inputChange_newName}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),"Number ",Object(m.jsx)("input",{value:e.newNumber,onChange:e.inputChange_newNumber})]}),Object(m.jsxs)("div",{children:[" ",Object(m.jsx)("br",{}),Object(m.jsx)("button",{type:"submit",children:"add new person"})]})]})},g=function(e){var n=e.setPersons,t=e.personList,r=e.filter,c=e.notif;return Object(m.jsx)("div",{children:t.map((function(e){return e.name.toLowerCase().includes(r.toLowerCase())?Object(m.jsxs)("div",{children:[e.name," ",e.number,Object(m.jsx)("button",{className:"deleteButton",onClick:function(){window.confirm("Delete ".concat(e.name,"?"))&&(b(e.id),n(t.filter((function(n){return n.id!==e.id}))),c("Deleted ".concat(e.name),5e3))},children:"x"})]},e.name):null}))})},v=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)(""),i=Object(u.a)(o,2),a=i[0],s=i[1],l=Object(r.useState)(""),b=Object(u.a)(l,2),v=b[0],w=b[1],N=Object(r.useState)(""),C=Object(u.a)(N,2),S=C[0],L=C[1],E=Object(r.useState)(null),_=Object(u.a)(E,2),k=_[0],y=_[1],I=Object(r.useState)(null),A=Object(u.a)(I,2),D=A[0],F=A[1];function P(e,n){y(e),setTimeout((function(){return y(null)}),n)}Object(r.useEffect)((function(){d().then((function(e){return c(e)}))}),[]);return Object(m.jsxs)("div",{id:"wrapper",children:[Object(m.jsx)("h1",{children:"Phonebook"}),Object(m.jsx)(h,{message:k}),Object(m.jsx)(O,{message:D}),Object(m.jsx)("h2",{children:"Add new"}),Object(m.jsx)(x,{submitForm:function(e){e.preventDefault();var n={name:a,number:v},r=t.filter((function(e){return e.name.toLowerCase()===n.name.toLocaleLowerCase()}));if(r.length>0){if(window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))){var o={id:r[0].id,name:n.name,number:n.number};f(o.id,o).then((function(e){P("Updated phonenumber of ".concat(e.name),5e3),c(t.map((function(n){return n.id===e.id?e:n})))})).catch((function(e){var r,i;console.log("HEI HEI SE OLEN MIN\xc4"+e),r="Information of ".concat(n.name," has already been removed from server"),i=5e3,F(r),setTimeout((function(){return F(null)}),i),c(t.filter((function(e){return e.id!==o.id})))}))}}else console.log("Adding new guy"),j(n).then((function(e){c(t.concat(n)),P("Added ".concat(n.name),5e3)}));s(""),w("")},newName:a,inputChange_newName:function(e){return s(e.target.value)},newNumber:v,inputChange_newNumber:function(e){return w(e.target.value)}}),Object(m.jsx)("h2",{children:"Numbers"}),Object(m.jsx)(p,{filter:S,inputChange_filter:function(e){return L(e.target.value)}}),Object(m.jsx)(g,{setPersons:c,notif:P,personList:t,filter:S})]})};t(40);i.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(v,{})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.8b5d093c.chunk.js.map