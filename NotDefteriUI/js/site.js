const apiUrl = "https://localhost:7032/api/Notlar";
let notlar = [];
let seciliNot = null;
function listele() {
    $("#notlar").html("");
    $.get(apiUrl, data => {
        notlar = data;
        for (const not of notlar) {
            let a = $("<a/>")
                .addClass("list-group-item")
                .addClass("list-group-action")
                .text(not.baslik)
                .attr("href", "#!")
                .attr("data-id", not.id)
                .click((e) => {
                    e.preventDefault();
                    ac(not);
                });
            if (not.id == seciliNot?.id) {
                seciliNot = not;
                a.addClass("active");
            }
            $("#notlar").append(a);
        }
    });
}

function ac(not) {
    seciliNot = not;
    $("#txtBaslik").val(not.baslik);
    $("#txtIcerik").val(not.icerik);
    $("#notlar>a").removeClass("active");
    $(`#notlar>a[data-id=${not.id}]`).addClass("active");

}

$("#frmNot").submit(kaydet);
$("#btnYeni").click(yeni);
$("#btnSil").click(sil);
function yeni() {
    seciliNot = null;
    $("#notlar>a").removeClass("active");
    $("#txtBaslik").val("");
    $("#txtIcerik").val("");
}
function sil() {
    if (seciliNot) {
        $.ajax({
            type: "delete",
            url: apiUrl + "/" + seciliNot.id,
            success: function () {
                yeni();
                listele();
            }
        });
    }
}

function kaydet(event) {
    event.preventDefault();
    if (seciliNot) {
        let not = { ...seciliNot };
        not.baslik = $("#txtBaslik").val();
        not.icerik = $("#txtIcerik").val();
        $.ajax({
            type: "put",
            url: apiUrl + "/" + not.id,
            contentType: "application/json",
            data: JSON.stringify(not),
            success: data => {
                seciliNot = data;
                listele();
            }
        });
    }
    else {
        let not = {};
        not.baslik = $("#txtBaslik").val();
        not.icerik = $("#txtIcerik").val();
        $.ajax({
            type: "post",
            url: apiUrl,
            contentType: "application/json",
            data: JSON.stringify(not),
            success: data => {
                seciliNot = data;
                listele();
            }
        });
    }
}
listele();








// fetch(apiUrl)
//     .then(res => res.json())
//     .then(data => {
//         for (const not of data) {
//             document.getElementById("notlar").innerHTML += `<li>${not.baslik}</li>`;
//         }
// })




{/* <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
The current link item
</a>
<a href="#" class="list-group-item list-group-item-action">A second link item</a>
<a href="#" class="list-group-item list-group-item-action">A third link item</a>
<a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
<a class="list-group-item list-group-item-action disabled">A disabled link item</a> */}