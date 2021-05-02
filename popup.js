document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    var checkerData = document.getElementById('checkerdata');
    checkerdata.style.display = "none";
    var returnButton = document.getElementById('returnButton');
    var checkerDataTable = document.getElementById('checkerdataTable');
    checkerDataTable.style.display = "none";
    $('#message').hide();
    checkPageButton.addEventListener('click', function() {
        var pincode = $('#pincode').val();
        var dateSelected = $('#dateSelected').val();
        var date = new Date(dateSelected),
            yr = date.getFullYear(),
            month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
            day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            newDate = day + '-' + month + '-' + yr;
        $.ajax({
            url: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + newDate,
            success: function(result) {
                $("#checker").hide();
                $("#checkerdata").show();
                if (result.sessions.length == 0) {
                    $('#message').show();
                } else {
                    for (i in result.sessions) {
                        $("#checkerdataTable").show();
                        var tr = document.createElement("tr");
                        tr.className = "createdData";

                        var name = document.createElement("td")
                        name.innerHTML = result.sessions[i].name;
                        tr.append(name);

                        var fee = document.createElement("td")
                        fee.innerHTML = result.sessions[i].fee;
                        tr.append(fee);

                        var ageLimit = document.createElement("td")
                        ageLimit.innerHTML = result.sessions[i].min_age_limit;
                        tr.append(ageLimit);

                        var availableCap = document.createElement("td")
                        availableCap.innerHTML = result.sessions[i].available_capacity;
                        tr.append(availableCap);

                        var vaccine = document.createElement("td")
                        vaccine.innerHTML = result.sessions[i].vaccine;
                        tr.append(vaccine);

                        checkerDataTable.append(tr);
                    }
                }
            }
        });
    });
    returnButton.addEventListener('click', function() {
        $("#checkerdata").hide();
        $("#checker").show();
        $("#checkerdataTable").hide();
        $('.createdData').remove();
        $('#message').hide();

    });
});