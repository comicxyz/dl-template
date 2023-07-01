import axios from 'axios';
import { parse } from 'node-html-parser';
import GetChapterImagesInterface from '../../@types/GetChapterImagesInterface.js';

const getChapterImages: GetChapterImagesInterface = async (url: string) => {
  const htmlResponse = await axios.get(url).then((resp) => resp.data);

  const parsedHtml = parse(htmlResponse);
  const images = parsedHtml.querySelectorAll('img.wp-manga-chapter-img');
  return images
    .map((img) => img.getAttribute('src') || img.getAttribute('data-src'))
    .filter((src): src is string => src !== undefined)
    .map((src) => src.trim())
    .filter((url2) => {
      try {
        return new URL(url2);
      } catch (err) {
        return false;
      }
    });
};

export default getChapterImages;
