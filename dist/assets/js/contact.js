function CheckMail(confirm) {
    var input1 = document.getElementById('email').value;
    var input2 = confirm.value;

    if (input1 != input2)
        confirm.setCustomValidity('入力値が一致しません。');
    else
        confirm.setCustomValidity('');
}