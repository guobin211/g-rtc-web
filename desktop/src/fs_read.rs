pub mod fs_read {
  use std::{io, fs};
  use std::io::Read;

  pub fn read_dist() -> io::Result<()> {
    let mut entries = fs::read_dir("dist")?
      .map(|res| res.map(|e| e.path()))
      .collect::<Result<Vec<_>, io::Error>>()?;
    entries.sort();
    Ok(())
  }
}
