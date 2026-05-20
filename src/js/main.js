import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

//adding a temporary console log to test the data source

async function testData() {
    const data = await dataSource.getData();
    console.log(data);
}
testData();