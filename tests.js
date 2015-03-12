var assert = chai.assert;

suite('CSV Tests', function() {
  test('Wrong input', function() {
    original.value = '"Name", "Lastname" \n "Adrian", "Mesa", "Jaubert"';
    calculate();
    assert.match(finaltable.innerHTML, /class="error"/);
  });
  
  test('local store work correctly', function () {
    assert.deepEqual(localStorage.original, 
            "\"Name\", \"Lastname\" \n \"Adrian\", \"Mesa\", \"Jaubert\"");
  });
  
  test('Right input', function () {
    original.value = '"Name","Lastname"\n"Adrian","Jaubert"'
    calculate();
    var expected = '\n            <table id="result">\n                \n                <tbody><tr class="">\n                    \n                    <td>Name</td>\n                    \n                    <td>Lastname</td>\n                    \n                </tr>\n                \n                <tr class="">\n                    \n                    <td>Adrian</td>\n                    \n                    <td>Jaubert</td>\n                    \n                </tr>\n                \n            </tbody></table>\n        '
    assert.deepEqual(finaltable.innerHTML, expected);
  });
});
