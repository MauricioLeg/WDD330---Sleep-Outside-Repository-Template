import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');
// Quick test to see if data loads in your browser console
async function testData() {
    const data = await dataSource.getData();
    console.log(data);
}
testData();