```react
// TypeError: Cannot read property 'getFieldDecorator' of undefined
// createForm会在props上创建一个form的数据
import { createForm } from 'rc-form';
const WrappedLogin = createForm()(login)
export default WrappedLogin

```

