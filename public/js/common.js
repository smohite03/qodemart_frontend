function register()
{
    const fname = $('#fname').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const gender = $('#gender').val();
    const role = $('#role').val();
    const password = $('#password').val();
    if(email != '^[a-z0-9]+@[a-z]+[.][a-z]+$')
    {
        alert('Please enter a valid email');
    }
    alert(fname);
}