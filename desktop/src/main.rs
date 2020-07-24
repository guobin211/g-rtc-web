mod fs_read;

extern crate web_view;

use std::fs;
use std::io::Read;
use web_view::Content;


fn main() {
    let mut _file = fs::File::open("web/dist/index.html").expect("index.html not found");
    let mut _contents = String::new();
    let _size = _file.read_to_string(&mut _contents).expect("read index.html failed");
    println!("{}", _contents);

    let _web = web_view::builder()
      .title("AppRTC")
      .content(Content::Html(_contents))
      .size(420, 720)
      .resizable(true)
      .debug(false)
      .user_data(())
      .invoke_handler(|_web_view, args| {
        println!("{}", args);
        Ok(())
      })
      .run()
      .unwrap();


}
