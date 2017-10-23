function deletepost(id) {
    alert('delete ' + id);

    //Delete from back end
    $.ajax({
        url: "http://localhost:3000/posts/" + id, // post id
        type: "DELETE" // Use DELETE
    })

    //Delete from front end
    $("#post" + id).empty();
}

function editpost(id) {
    //alert('edit ' + id);
    $("#title" + id).prop('readonly', false);
    $.ajax({
        type: 'PUT',
        //data: {name: 'Billy Bob', age: 28},
        url: "http://localhost:3000/posts/",
        success: function () {
            //no data...just a success (200) status code
            console.log('Updated Successfully!');
        }
    });
}

function savepost(id, title) {
    // console.log(id,title);
    var title = title;
    //var title = title;

    //console.log(text);
    var newposts = {};

    newposts.id = id;
    newposts.title = $("#title" + id).val();

    //newposts.title = text;

    //console.log(newposts);
    // console.log(newposts.title);
    //$("#title" + id).prop('readonly', true);
    // console.log(newposts);
    var url = "http://localhost:3000/posts/" + id;
    // $("#title" + id).prop("");
    $.ajax({
        type: 'PUT',
        data: newposts,
        url: url,
        success: function () {
            //no data...just a success (200) status code
            console.log(newposts);
        }
    });
}



$(function () {



    $("#add").click(function () {


        var newposts = {};
        newposts.id = null;
        newposts.title = $("#record").val();

        var url = "http://localhost:3000/posts";
        $.post(url, newposts, function (data, status) {
            console.log("Inserted " + data);
            $("#record").val("");

        });


        var url = "http://localhost:3000/posts";
        $.get(url, function (data) {
            console.log(data.length);
            var template = $('#template').html();
            for (var i = data.length; i <= data.length; i++) {
                var rendered = Mustache.render(template, data[i - 1]);
                $("#showinfo").append(rendered);
            }
        });



    });


    $("#showinfo").empty();
    var url = "http://localhost:3000/posts";
    $.get(url, function (data) {
        console.log(data);

        var templates = $('#template').html();
        for (var i = 0; i < data.length; i++) {
            var rendered = Mustache.render(templates, data[i]);
            $("#showinfo").append(rendered);

        }
    });

});