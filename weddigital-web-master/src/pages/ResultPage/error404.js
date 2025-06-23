import React from 'react';
import { Button, Result } from 'antd';
const App = () => (
    <Result
        status="404"
        title="404"
        subTitle="Ooops, parece que essa página não existe em nosa plataforma."
        // extra={<Button type="primary">Back Home</Button>}
    />
);
export default App;