// // Client 
// const token = 'BQDpBzeLA9EP1QLTUgIzqRVZyRmdOfXFVhTkf9yDrZKhI2DFuc8pRLrvZVRMHQHvqhgzFbG6uWKMuyt4q1JOZclFCFQjpq_fTYs1MMdnXLP3vT80rynT9B5JXL8_PDjFgKBXgkI4QcTs5vGzOwH9A_iZdTss15AeLXduU8GXJaS2PBC0pAAwi3dX3BXk2GKfz-CSn8J_wbkflzcYyD9z6BInsecscBNPi8bUVQx4xoIft8LriJPW3ediWO6Xzgh9BWLbmncxWCx48EbI_5OM-0CK';
// const url = "https://api.spotify.com/v1/artists?ids=2GoeZ0qOTt6kjsWW4eA6LS%2C0oOet2f43PA68X5RxKobEy%2C7uIbLdzzSEqnX0Pkrb56cR%2C06HL4z0CvFAxyc27GXpf02%2C6VuMaDnrHyPL1p4EHjYLi7%2C4YRxDV8wJFPHPTeXepOstw%2C4IKVDbCSBTxBeAsMKjAuTs%2C1dVygo6tRFXC8CSWURQJq2%2C4zCH9qm4R2DADamUHMCa6O%2C1tqysapcCh1lWEAc9dIFpa"

// const request = new Request(
//     url,{
//         headers:{
//             'Authorization': `Bearer ${token}`
//         },
// }) 

 
// async function getData() {
//     try {
//         const response = await fetch(request);
//         const data = await response.json();
//         console.log(data);
        
//         // Get the data-container element
//         const dataContainer = document.getElementById("data-container");

//         // Create an HTML structure to display the data (modify as needed)
//         const artistList = document.createElement("ul");

//         // Loop through the data and create list items for each artist
//         data.artists.forEach(artist => {
//             const listItem = document.createElement("li");
//             listItem.textContent = `Artist Name: ${artist.name}, Popularity: ${artist.popularity}`;
//             artistList.appendChild(listItem);
//         });

//         // Append the artistList to the data-container
//         dataContainer.appendChild(artistList);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }
// getData()

const token = 'BQD_FjVPZjBX1mH8QHPh929rRIhrprwoHj9GlpMo5wFWjPzBYQ1oSVegD1SToNfGuXHbjmY8O-idojiYicFYf9PenRrlz1YYCzWVpwKEWXfgsCspv1TSM6N3LJfqyPBGV_NpsFMgjeLhMC5uhAx7LRKRwREntl1HtwkVEnk29fM9c_aB2fBqz_ALsaJDeAFeDaZswE4JyWRo1zEmPUOlBlQa9rAk7raEKghroV50TuPgTurNrwuaRm8lydlx5Rm2Y7Iu58UvDOIgvmofaVnJGg5k';
const artistIds = [
  '4YRxDV8wJFPHPTeXepOstw',
  '7uIbLdzzSEqnX0Pkrb56cR',
  '0oOet2f43PA68X5RxKobEy',
  '2o4R2rK7FetH40HTv0SUWl',
  '00sCATpEvwH48ays7PlQFU',
  '7n2wHs1TKAczGzO7Dd2rGr',
  '0C8ZW7ezQVs4URX5aX7Kqx',
  '2GoeZ0qOTt6kjsWW4eA6LS',
  '7hHDO4bJGlEaEHlY2lj1eZ',
  '4zCH9qm4R2DADamUHMCa6O'
];

const dataContainer = document.getElementById("data-container");

async function fetchArtistData(artistId) {
  const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
  const headers = {
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await fetch(artistUrl, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching artist data:", error);
    return null;
  }
}

async function getData() {
  try {
    const artistDataPromises = artistIds.map(fetchArtistData);
    const artistDataArray = await Promise.all(artistDataPromises);

    const artistList = document.createElement("ul");

    artistDataArray.forEach(artist => {
      if (artist) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <h3>Artist Name: ${artist.name}</h3>
          <p>Follower: ${artist.followers.total}</p>
          <p>Music Kind: ${artist.genres.join(', ')}</p>
          <p>Popularity: ${artist.popularity}</p>
          <img src="${artist.images[0].url}" alt="${artist.name}'s Image">
        `;
        artistList.appendChild(listItem);
      }
    });

    dataContainer.appendChild(artistList);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getData();