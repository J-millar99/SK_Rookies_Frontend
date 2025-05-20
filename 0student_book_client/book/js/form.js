//전역변수
const API_BASE_URL = "http://localhost:8080";

//DOM 엘리먼트 가져오기
const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");

//Document Load 이벤트 처리하기
document.addEventListener("DOMContentLoaded", function () {
  // 화면이 뜨자마자 처리해주는 이벤트
  console.log("페이지 로드 완료");
  loadBooks();
});

//Form Submit 이벤트 처리하기
bookForm.addEventListener("submit", function (event) {
  // 해당 이벤트의 기본 동작을 취소하는 역할 : 입력 폼을 확인하고 제출하기 위함
  event.preventDefault();

  const formData = new FormData(bookForm);
  const bookData = {
        title: formData.get('title').trim(),
        author: formData.get('author').trim(),
        isbn: formData.get('isbn').trim(),
        price: formData.get('price') ? parseInt(formData.get('price')) : null,
        publishData: formData.get('publishDate') || null,
        bookDetail: {
            description: formData.get('description').trim() || null,
            language: formData.get('language').trim() || null,
            pageCount: formData.get('pageCount') ? parseInt(formData.get('pageCount')) : null,
            publisher: formData.get('publisher').trim() || null,
            coverImageUrl: formData.get('coverImageUrl').trim() || null,
            edition: formData.get('edition').trim() || null,
        }
    };

    if (!validateBook(bookData)) {
        return;
    }
    console.log('유효한 데이터: ', bookData);
});

//데이터 유효성을 체크하는 함수
function validateBook(book) {
  // 필수 필드 검사
  if (!book.title) {
    alert("제목을 입력해주세요.");
    return false;
  }

  if (!book.author) {
    alert("저자를 입력해주세요.");
    return false;
  }

  if (!book.isbn) {
    alert("ISBN을 입력해주세요.");
    return false;
  }

  if (!book.price) {
    alert("가격을 입력해주세요.");
    return false;
  }

  const isbnPattern = /^[0-9X-]+$/;
  if (!isbnPattern.test(book.isbn)) {
    alert("올바른 ISBN 형식이 아닙니다. (숫자와 X, -만 허용)");
    return false;
  }

  if (book.price !== null && book.price < 0) {
    alert('가격은 0 이상이어야 합니다.');
    return false;
  }

  if (book.bookDetail.pageCount !== null && book.bookDetail.pageCount < 0) {
    alert('페이지 수는 0 이상이어야 합니다.');
    return false;
  }

  if (book.bookDetail.coverImageUrl && isValidUrl(book.bookDetail.coverImageUrl)) {
    alert('올바른 이미지 URL 형식이 아닙니다.');
    return false;
  }

  return true;
} //validatebook

// URL 유효성 검사
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch(_) {
        return false;
    }
}

function loadbooks() {
  console.log("도서 목록 로드 중.....");
}
