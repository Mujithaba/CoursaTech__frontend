function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
          <p>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
