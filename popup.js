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
        if (pincode && dateSelected) {
            $("#validationMessage").hide();
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
                        // chrome.runtime.sendMessage('', {
                        //     type: 'notification',
                        //     options: {
                        //         type: "basic",
                        //         title: "Vaccine Available",
                        //         iconUrl: 'icon.png',
                        //         message: "Vaccine is Available"
                        //     }
                        // });
                        for (i in result.sessions) {
                            $("#checkerdataTable").show();
                            var tr = document.createElement("tr");
                            tr.className = "createdData";

                            var name = document.createElement("td")
                            name.innerHTML = result.sessions[i].name;
                            name.className = "checkerdataTableData";
                            tr.append(name);

                            var fee = document.createElement("td")
                            fee.innerHTML = result.sessions[i].fee;
                            fee.className = "checkerdataTableData";
                            tr.append(fee);

                            var ageLimit = document.createElement("td")
                            ageLimit.innerHTML = result.sessions[i].min_age_limit;
                            ageLimit.className = "checkerdataTableData";
                            tr.append(ageLimit);

                            var availableCap = document.createElement("td")
                            availableCap.innerHTML = result.sessions[i].available_capacity;
                            availableCap.className = "checkerdataTableData";
                            tr.append(availableCap);

                            var vaccine = document.createElement("td")
                            vaccine.innerHTML = result.sessions[i].vaccine;
                            vaccine.className = "checkerdataTableData";
                            tr.append(vaccine);

                            checkerDataTable.append(tr);
                        }
                    }
                }
            });
        } else {
            $('#message').show();
            $('#validationMessage').text("Pincode or Date not valid");
        }
    });
    returnButton.addEventListener('click', function() {
        $("#checkerdata").hide();
        $("#checker").show();
        $("#checkerdataTable").hide();
        $('.createdData').remove();
        $('#message').hide();

    });
});