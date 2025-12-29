(function () {
    // Note: Styles have been moved to style.css for better separation.

    // Footer HTML Content (Modern Layout)
    const footerHTML = `
    <footer class="footer-modern">
        <div class="footer-container">
            <!-- Brand & Address -->
            <div class="footer-section footer-brand">
                <h3>DAWIN ICT</h3>
                <p><strong>(주)다윈아이씨티</strong></p>
                <div class="contact-item">
                    <i class="fa fa-map-marker-alt"></i>
                    <span>&nbsp;주&nbsp;&nbsp;&nbsp;소 : 서울시 영등포구 여의나루로 53-1 대오빌딩 906호</span>
                </div>
                <div class="contact-item">
                    <i class="fa fa-phone"></i>
                    <span>전&nbsp;&nbsp;&nbsp;화 : +82 2 3775 4363 ~ 4365</span>
                </div>
                <div class="contact-item">
                    <i class="fa fa-fax"></i>
                    <span>팩&nbsp;&nbsp;&nbsp;스 : +82 2 3775 4366</span>
                </div>
                <div class="contact-item">
                    <i class="fa fa-envelope"></i>
                    <span>이메일 : dawinict@dawinit.com</span>
                </div>
            </div>

           

            <!-- Company Details -->
            <div class="footer-section footer-company">
                <h3>Company Info</h3>
                <p><strong><span style="letter-spacing: 0.18em;">대표이사</span> : </strong> 김성덕</p>
                <p><strong>사업자번호 : </strong> 101-86-52969</p>
                <p style="margin-top:15px; color:#ffffff; font-size:12px;">
                    다윈아이씨티는 고객의 성공적인 비즈니스를 위해<br>최적의 IT 솔루션을 제공합니다.
                </p>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
            <div class="footer-bottom-container">
                <div class="footer-info">
                    COPYRIGHT&copy; 2025 BY DAWINICT. Co., LTD. ALLRIGHT RESERVED.
                </div>
                <div class="footer-legal">
                    <a href="privacy.html">개인정보취급방침</a>
                    <a href="no_email.html">이메일무단수집거부</a>
                </div>
                <div class="scroll-top-btn" onclick="window.scrollTo({top: 0, behavior: 'smooth'});">
                    <i class="fa fa-angle-up"></i>
                </div>
            </div>
        </div>
    </footer>
    `;

    document.write(footerHTML);
})();
