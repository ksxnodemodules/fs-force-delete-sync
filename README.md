
# fs-force-delete-sync

## Requirements

 * Node >= 6.0.0

## Usage

```javascript
var rmSync = require('fs-force-delete-sync');
try {
    let info = rmSync('foo');
    console.log('Succeed', info);
} catch (error) {
    console.log('Failed', error);
}
```

The code above would check for `'foo'` existence,
 * If `'foo'` doesn't exist, `rmSync` does nothing
 * If `'foo'` is a file, `rmSync` would deletes that file
 * If `'foo'` is a directory, `rmSync` would recurs itself with children of `'foo'` and then deletes `'foo'`

## License

[MIT](https://github.com/ksxnodemodules/my-licenses/blob/master/MIT.md) © [Hoàng Văn Khải](https://github.com/KSXGitHub)
